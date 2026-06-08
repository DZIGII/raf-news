import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, ForeignKey, BelongsTo
} from 'sequelize-typescript'
import { News } from './News'

@Table({
    tableName: "news_visits",
    timestamps: false
})
export class NewsVisits extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_visits_id"
    })
    declare newsVisitsId: number

    @ForeignKey(() => News)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_id",
        onDelete: 'CASCADE'
    })
    declare newsId: number

    @BelongsTo(() => News)
    declare news: News

    @Column({
        type: DataType.DATE,
        field: "visited_at",
        defaultValue: DataType.NOW
    })
    declare visitedAt: Date
}
