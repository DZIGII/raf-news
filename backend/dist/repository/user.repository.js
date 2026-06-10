"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepostiory = void 0;
const User_1 = require("../models/User");
class UserRepostiory {
    async fingByEmail(email) {
        return User_1.User.findOne({
            where: { email }
        });
    }
    async findById(userId) {
        return User_1.User.findByPk(userId);
    }
    async createUser(userData) {
        return User_1.User.create(userData);
    }
    async findAll(limit, offset) {
        return User_1.User.findAll({ limit, offset });
    }
    async deleteUserByPk(userId) {
        await User_1.User.destroy({ where: { userId } });
    }
    async updateUser(userId, userData) {
        const user = await User_1.User.findByPk(userId);
        if (!user)
            throw new Error('User not found');
        return user.update(userData);
    }
    async countAll() {
        return User_1.User.count();
    }
}
exports.UserRepostiory = UserRepostiory;
//# sourceMappingURL=user.repository.js.map