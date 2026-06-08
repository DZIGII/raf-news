import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany, HasMany,
  AllowNull
} from 'sequelize-typescript'
import { User } from './User'
import { Tag } from './Tag'
import { NewsTag } from './NewsTag'
import { Comment } from './Comment'
import { NewsImage } from './NewsImage'
import { Category } from './Category'

@Table({
    tableName: "news",
    timestamps: false
})
export class News extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_id"
    })
    declare newsId: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "title"
    })
    declare title: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "text"
    })
    declare text: string

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
    declare like: number

    @Column({
      type: DataType.INTEGER.UNSIGNED,
      defaultValue: 0
    })
    declare dislike: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "user_id",
        onDelete: 'CASCADE'
    })
    declare userId: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "category_id"
    })
    declare categoryId: number

    @BelongsTo(() => Category)
    declare category: Category

    @BelongsTo(() => User)
    declare createdBy: User;

    @BelongsToMany(() => Tag, () => NewsTag)
    declare tags: Tag[]

    @HasMany(() => Comment, {onDelete: 'CASCADE', hooks: true})
    declare comments: Comment[]

    @HasMany(() => NewsImage, {onDelete: 'CASCADE', hooks: true})
    declare images: NewsImage[]
}
