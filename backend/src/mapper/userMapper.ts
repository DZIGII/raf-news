import { UserResponseDto } from "../dto/user/UserResponseDto";
import { User } from "../models/User";

export function toUserResponseDto(user: User): UserResponseDto {
    return {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isActive:user.isActive
    }
}