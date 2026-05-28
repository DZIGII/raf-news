import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { News } from "../models/News";
import { NewsTag } from "../models/NewsTag";
import { Tag } from "../models/Tag";
import { Comment } from '../models/Comment';
import { NewsImage } from '../models/NewsImage';
import { Category } from '../models/Category';
import { NewsVisits } from '../models/NewsVisits';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME!,
    username: process.env.DB_USER!,
    password: String(process.env.DB_PASS)!,
    models: [User, News, Tag, NewsTag, Comment, NewsImage, Category, NewsVisits]
})