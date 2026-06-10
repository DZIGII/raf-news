import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "ADMIN" | "CREATOR";
    isActive: boolean;
}
//# sourceMappingURL=User.d.ts.map