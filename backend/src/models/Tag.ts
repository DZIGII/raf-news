import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, BelongsToMany
} from 'sequelize-typescript'
import { News } from './News'
import { NewsTag } from './NewsTag'

@Table({
    tableName: "tags",
    timestamps: false
})
export class Tag extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        field: "tag_id"
    })
    declare tagId: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare keyword: string

    @BelongsToMany(() => News, () => NewsTag)
    declare news: News[]
}
