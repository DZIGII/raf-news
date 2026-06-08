import { RegisterDto } from "../dto/user/RegisterDto";
import { UserRepostiory } from "../repository/user.repository";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.config'
import { LoginDto } from '../dto/user/LoginDto'
import { UserResponseDto } from "../dto/user/UserResponseDto";
import { UpdateUserDto } from "../dto/user/UpdateUserDto";
import { toUserResponseDto } from "../mapper/userMapper";

function g(model: any, field: string): any {
    return model.get(field);
}

export class UserService {
    private userRepository = new UserRepostiory()

    async register(dto: RegisterDto) {
        if (!dto.firstName || dto.firstName.trim() === '') throw new Error('First name is required')
        if (!dto.lastName || dto.lastName.trim() === '') throw new Error('Last name is required')
        if (!dto.email || dto.email.trim() === '') throw new Error('Email is required')
        if (!dto.password || dto.password.trim() === '') throw new Error('Password is required')

        const existing = await this.userRepository.fingByEmail(dto.email)
        if (existing) throw new Error('User with that email already exists')

        if (dto.password !== dto.passwordConfirm)
            throw new Error('Passwords do not match')

        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const user = await this.userRepository.createUser({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: hashedPassword,
            role: dto.role || 'CREATOR'
        })

        const token = jwt.sign(
            {
                userId: g(user, 'userId'),
                role: g(user, 'role'),
                email: g(user, 'email'),
                name: `${g(user, 'firstName')} ${g(user, 'lastName')}`
            },
            jwtConfig.secret
        )

        return token
    }

    async login(dto: LoginDto) {
        if (!dto.email || dto.email.trim() === '') throw new Error('Email is required')
        if (!dto.password || dto.password.trim() === '') throw new Error('Password is required')

        const user = await this.userRepository.fingByEmail(dto.email)
        if (!user) throw new Error('Invalid credentials')

        if (!g(user, 'isActive')) throw new Error('Account is disabled')

        const isMatch = await bcrypt.compare(dto.password, user.password)
        if (!isMatch) throw new Error('Invalid credentials')

        const token = jwt.sign(
            {
                userId: g(user, 'userId'),
                role: g(user, 'role'),
                email: g(user, 'email'),
                name: `${g(user, 'firstName')} ${g(user, 'lastName')}`
            },
            jwtConfig.secret
        )

        return token;
    }

    async update(dto: UpdateUserDto, user: JwtPayload): Promise<UserResponseDto> {
        const existing = await this.userRepository.findById(user.userId)
        if (!existing) throw new Error('User not found')

        const updated = await this.userRepository.updateUser(user.userId, dto)
        return toUserResponseDto(updated)
    }

    async updateByAdmin(userId: number, dto: UpdateUserDto, admin: JwtPayload): Promise<UserResponseDto> {
        if (admin.role !== 'ADMIN') throw new Error('You are not allowed to do that')

        const existing = await this.userRepository.findById(userId)
        if (!existing) throw new Error('User not found')

        if (dto.email && dto.email !== g(existing, 'email')) {
            const emailTaken = await this.userRepository.fingByEmail(dto.email)
            if (emailTaken) throw new Error('Email already taken')
        }

        const updated = await this.userRepository.updateUser(userId, dto)
        return toUserResponseDto(updated)
    }

    async toggleActive(userId: number, admin: JwtPayload): Promise<UserResponseDto> {
        if (admin.role !== 'ADMIN') throw new Error('You are not allowed to do that')

        const existing = await this.userRepository.findById(userId)
        if (!existing) throw new Error('User not found')

        const updated = await this.userRepository.updateUser(userId, { isActive: !g(existing, 'isActive') })
        return toUserResponseDto(updated)
    }

    async findById(userId: number): Promise<UserResponseDto> {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new Error('User not found')
        return toUserResponseDto(user)
    }

    async delete(userId: number, user: JwtPayload) {
        if (user.role !== 'ADMIN') throw new Error('You are not allowed to do that')
        return this.userRepository.deleteUserByPk(userId)
    }

    async findAll(limit: number, offset: number, user: JwtPayload): Promise<{ users: UserResponseDto[], total: number }> {
        if (user.role !== 'ADMIN')
            throw new Error('You are not allowed to do that')

        const users = await this.userRepository.findAll(limit, offset)
        const total = await this.userRepository.countAll()
        return {
            users: users.map((user) => toUserResponseDto(user)),
            total
        }
    }
}
