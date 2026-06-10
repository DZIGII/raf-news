"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponseDto = toUserResponseDto;
function toUserResponseDto(user) {
    const d = user.toJSON();
    return {
        userId: d.userId,
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        role: d.role,
        isActive: d.isActive
    };
}
//# sourceMappingURL=userMapper.js.map