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
    newsId!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "title"
    })
    title!: string

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: "text"
    })
    text!: string

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    })
    visits!: number

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

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        defaultValue: 0
    })
    numberOfVisits!: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "user_id"
    })
    userId!: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "category_id"
    })
    categoryId!: number

    @BelongsTo(() => Category)
    category!: Category

    @BelongsTo(() => User)
    createdBy!: User;

    @BelongsToMany(() => Tag, () => NewsTag)
    tags!: Tag[]

    @HasMany(() => Comment)
    comments!: Comment[]

    @HasMany(() => NewsImage)
    images!: NewsImage[]
}
