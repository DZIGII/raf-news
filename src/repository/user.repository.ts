import { User } from "../models/User";

export class UserRepostiory {

    async fingByEmail(email: string) {
        return User.findOne({
            where: {email}
        })
    }

    async findById(userId: number) {
        return User.findByPk(userId)
    }

    async createUser(userData: Partial<User>): Promise<User> {
        return User.create(userData)
    }

    async findAll(limit: number, offset: number): Promise<User[]> {
        return User.findAll({limit, offset})
    }

    async deleteUserByPk(userId: number): Promise<void>{
        await User.destroy({where:{userId}})
    }

    async updateUser(userId: number, userData: Partial<User>): Promise<User> {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found')
        return user.update(userData)
    }

}