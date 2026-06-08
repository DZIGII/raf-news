import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, Unique
} from 'sequelize-typescript'

@Table({
    tableName: "categories",
    timestamps: false
})
export class Category extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "category_id"
    })
    declare categoryId: number

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "name"
    })
    declare name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "description"
    })
    declare description: string
}
