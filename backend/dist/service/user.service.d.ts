import { RegisterDto } from "../dto/user/RegisterDto";
import { JwtPayload } from 'jsonwebtoken';
import { LoginDto } from '../dto/user/LoginDto';
import { UserResponseDto } from "../dto/user/UserResponseDto";
import { UpdateUserDto } from "../dto/user/UpdateUserDto";
export declare class UserService {
    private userRepository;
    register(dto: RegisterDto): Promise<string>;
    login(dto: LoginDto): Promise<string>;
    update(dto: UpdateUserDto, user: JwtPayload): Promise<UserResponseDto>;
    updateByAdmin(userId: number, dto: UpdateUserDto, admin: JwtPayload): Promise<UserResponseDto>;
    toggleActive(userId: number, admin: JwtPayload): Promise<UserResponseDto>;
    findById(userId: number): Promise<UserResponseDto>;
    delete(userId: number, user: JwtPayload): Promise<void>;
    findAll(limit: number, offset: number, user: JwtPayload): Promise<{
        users: UserResponseDto[];
        total: number;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map