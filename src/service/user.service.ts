import { RegisterDto } from "../dto/user/RegisterDto";
import { UserRepostiory } from "../repository/user.repository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.config'
import { LoginDto } from '../dto/user/LoginDto'
import { UserResponseDto } from "../dto/user/UserResponseDto";
import { UpdateUserDto } from "../dto/user/UpdateUserDto";
import { toUserResponseDto } from "../mapper/userMapper";
import { User } from "../models/User";


export class UserService {
    private userRepository = new UserRepostiory()

    async register(dto: RegisterDto) {
        const existing = await this.userRepository.fingByEmail(dto.email)
        if (existing) throw new Error('User with that email alrady exist')
        
        const hashedPassword = await bcrypt.hash(dto.password, 10)

        return this.userRepository.createUser({
            firstName: dto.firstName,
            lastName:dto.lastName,
            email: dto.email,
            password: hashedPassword
        })
    }

    async login(dto: LoginDto) {
        const user = await this.userRepository.fingByEmail(dto.email)
        if (!user) throw new Error('Invalid credentials')

        if (!user.isActive) throw new Error('Accound is disabled')
        
        const isMatch = await bcrypt.compare(dto.password, user.password)
        if (!isMatch) throw new Error('Invalid credetials')
        
        const token = jwt.sign(
            {userId: user.userId, role: user.role},
            jwtConfig.secret
        )

        return token;
    }

    async update(userId: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new Error('User not found')

        return this.userRepository.updateUser(userId, dto)
    }


    async delete(userId: number) {
        return this.userRepository.deleteUserByPk(userId)
    }

    async findAll(limit: number, offset: number): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAll(limit, offset)
        return users.map((user) => toUserResponseDto(user))
    }


}