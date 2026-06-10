"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repository/user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../config/jwt.config");
const userMapper_1 = require("../mapper/userMapper");
function g(model, field) {
    return model.get(field);
}
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepostiory();
    }
    async register(dto) {
        if (!dto.firstName || dto.firstName.trim() === '')
            throw new Error('First name is required');
        if (!dto.lastName || dto.lastName.trim() === '')
            throw new Error('Last name is required');
        if (!dto.email || dto.email.trim() === '')
            throw new Error('Email is required');
        if (!dto.password || dto.password.trim() === '')
            throw new Error('Password is required');
        const existing = await this.userRepository.fingByEmail(dto.email);
        if (existing)
            throw new Error('User with that email already exists');
        if (dto.password !== dto.passwordConfirm)
            throw new Error('Passwords do not match');
        const hashedPassword = await bcrypt_1.default.hash(dto.password, 10);
        const user = await this.userRepository.createUser({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: hashedPassword,
            role: dto.role || 'CREATOR'
        });
        const token = jsonwebtoken_1.default.sign({
            userId: g(user, 'userId'),
            role: g(user, 'role'),
            email: g(user, 'email'),
            name: `${g(user, 'firstName')} ${g(user, 'lastName')}`
        }, jwt_config_1.jwtConfig.secret);
        return token;
    }
    async login(dto) {
        if (!dto.email || dto.email.trim() === '')
            throw new Error('Email is required');
        if (!dto.password || dto.password.trim() === '')
            throw new Error('Password is required');
        const user = await this.userRepository.fingByEmail(dto.email);
        if (!user)
            throw new Error('Invalid credentials');
        if (!g(user, 'isActive'))
            throw new Error('Account is disabled');
        const isMatch = await bcrypt_1.default.compare(dto.password, user.password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        const token = jsonwebtoken_1.default.sign({
            userId: g(user, 'userId'),
            role: g(user, 'role'),
            email: g(user, 'email'),
            name: `${g(user, 'firstName')} ${g(user, 'lastName')}`
        }, jwt_config_1.jwtConfig.secret);
        return token;
    }
    async update(dto, user) {
        const existing = await this.userRepository.findById(user.userId);
        if (!existing)
            throw new Error('User not found');
        const updated = await this.userRepository.updateUser(user.userId, dto);
        return (0, userMapper_1.toUserResponseDto)(updated);
    }
    async updateByAdmin(userId, dto, admin) {
        if (admin.role !== 'ADMIN')
            throw new Error('You are not allowed to do that');
        const existing = await this.userRepository.findById(userId);
        if (!existing)
            throw new Error('User not found');
        if (dto.email && dto.email !== g(existing, 'email')) {
            const emailTaken = await this.userRepository.fingByEmail(dto.email);
            if (emailTaken)
                throw new Error('Email already taken');
        }
        const updated = await this.userRepository.updateUser(userId, dto);
        return (0, userMapper_1.toUserResponseDto)(updated);
    }
    async toggleActive(userId, admin) {
        if (admin.role !== 'ADMIN')
            throw new Error('You are not allowed to do that');
        const existing = await this.userRepository.findById(userId);
        if (!existing)
            throw new Error('User not found');
        const updated = await this.userRepository.updateUser(userId, { isActive: !g(existing, 'isActive') });
        return (0, userMapper_1.toUserResponseDto)(updated);
    }
    async findById(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new Error('User not found');
        return (0, userMapper_1.toUserResponseDto)(user);
    }
    async delete(userId, user) {
        if (user.role !== 'ADMIN')
            throw new Error('You are not allowed to do that');
        return this.userRepository.deleteUserByPk(userId);
    }
    async findAll(limit, offset, user) {
        if (user.role !== 'ADMIN')
            throw new Error('You are not allowed to do that');
        const users = await this.userRepository.findAll(limit, offset);
        const total = await this.userRepository.countAll();
        return {
            users: users.map((user) => (0, userMapper_1.toUserResponseDto)(user)),
            total
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map