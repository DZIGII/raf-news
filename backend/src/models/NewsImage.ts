import { Table, Model, Column, DataType, BelongsTo, PrimaryKey, AutoIncrement, ForeignKey } from "sequelize-typescript";
import { News } from "./News";

@Table({
    tableName: "news_images",
    timestamps: false
})
export class NewsImage extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        field: "image_id"
    })
    declare imageId: number

    @Column({
        type: DataType.STRING(512),
        allowNull: false,
        field: "url"
    })
    declare imageUrl: string

    @ForeignKey(() => News)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        field: "news_id"
    })
    declare newsId: number

    @BelongsTo(() => News)
    declare news: News
}
