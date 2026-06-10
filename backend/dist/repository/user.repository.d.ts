import { User } from "../models/User";
export declare class UserRepostiory {
    fingByEmail(email: string): Promise<User | null>;
    findById(userId: number): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
    findAll(limit: number, offset: number): Promise<User[]>;
    deleteUserByPk(userId: number): Promise<void>;
    updateUser(userId: number, userData: Partial<User>): Promise<User>;
    countAll(): Promise<number>;
}
//# sourceMappingURL=user.repository.d.ts.map