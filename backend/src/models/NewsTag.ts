import {
  Table, Column, Model, DataType,
  ForeignKey, PrimaryKey
} from 'sequelize-typescript'
import { News } from './News'
import { Tag } from './Tag'

@Table({
    tableName: "news_tags",
    timestamps: false
})
export class NewsTag extends Model {

    @ForeignKey(() => News)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        field: "news_id"
    })
    newsId!: number

    @ForeignKey(() => Tag)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        field: "tag_id"
    })
    tagId!: number
}
