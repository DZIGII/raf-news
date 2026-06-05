import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, ForeignKey, BelongsTo
} from 'sequelize-typescript'
import { News } from './News'

@Table({
    tableName: "comments",
    timestamps: false
})
export class Comment extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        field: "comment_id"
    })
    commentId!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "author_name"
    })
    authorName!: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    content!: string

    @Column({
        type: DataType.DATE,
        field: "created_at",
        defaultValue: DataType.NOW
    })
    declare createdAt: Date;

    @Column({
      type: DataType.INTEGER.UNSIGNED,
      defaultValue: 0
    })
    like!: number

    @Column({
      type: DataType.INTEGER.UNSIGNED,
      defaultValue: 0
    })
    dislike!: number

    @ForeignKey(() => News)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_id"
    })
    newsId!: number

    @BelongsTo(() => News)
    news!: News
}
