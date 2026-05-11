import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, Unique,
  AllowNull
} from 'sequelize-typescript'

@Table({
    tableName: "users",
    timestamps: false
})
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        field: "user_id"
    })
    userId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "first_name",
    })
    firstName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "last_name"
    })
    lastName!: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "password_hash"
    })
    password!: string;

    @Column({
        type: DataType.ENUM('ADMIN', 'CREATOR'),
        field: "role",
        defaultValue: 'CREATOR'
    })
    role!: "ADMIN" | "CREATOR";

    @Column({
        type: DataType.BOOLEAN,
        field: "is_active",
        defaultValue: true
    })
    isActive!: boolean
}