import { UserResponseDto } from "../dto/user/UserResponseDto";
import { User } from "../models/User";

export function toUserResponseDto(user: User): UserResponseDto {
    const d: any = user.toJSON();
    return {
        userId: d.userId,
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        role: d.role,
        isActive: d.isActive
    }
}
