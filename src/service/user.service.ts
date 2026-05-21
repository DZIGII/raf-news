import { RegisterDto } from "../dto/user/RegisterDto";
import { UserRepostiory } from "../repository/user.repository";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.config'
import { LoginDto } from '../dto/user/LoginDto'
import { UserResponseDto } from "../dto/user/UserResponseDto";
import { UpdateUserDto } from "../dto/user/UpdateUserDto";
import { toUserResponseDto } from "../mapper/userMapper";


export class UserService {
    private userRepository = new UserRepostiory()

    async register(dto: RegisterDto) {
        const existing = await this.userRepository.fingByEmail(dto.email)
        if (existing) throw new Error('User with that email alrady exist')
        
        if (dto.password !== dto.passwordConfirm)
            throw new Error('Password dosent match')
        
        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const user = await this.userRepository.createUser({
            firstName: dto.firstName,
            lastName:dto.lastName,
            email: dto.email,
            password: hashedPassword
        })

        const token = jwt.sign(
            {userId: user.userId, role: user.role},
            jwtConfig.secret
        )

        return token
    }

    async login(dto: LoginDto) {
        const user = await this.userRepository.fingByEmail(dto.email)
        if (!user) throw new Error('Invalid credentials')

        console.log(dto)

        if (!user.isActive) throw new Error('Accound is disabled')
        
        const isMatch = await bcrypt.compare(dto.password, user.password)
        if (!isMatch) throw new Error('Invalid credetials')
        
        const token = jwt.sign(
            {userId: user.userId, role: user.role},
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


    async delete(userId: number, user: JwtPayload) {

        if (user.role !== 'ADMIN') throw new Error('You are not allow to do that')

        return this.userRepository.deleteUserByPk(userId)
    }

    async findAll(limit: number, offset: number, user: JwtPayload): Promise<UserResponseDto[]> {

        if (user.role !== 'ADMIN')
            throw new Error('You are not allow to do that')

        const users = await this.userRepository.findAll(limit, offset)
        return users.map((user) => toUserResponseDto(user))
    }


}