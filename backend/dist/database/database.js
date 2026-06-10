"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const News_1 = require("../models/News");
const NewsTag_1 = require("../models/NewsTag");
const Tag_1 = require("../models/Tag");
const Comment_1 = require("../models/Comment");
const NewsImage_1 = require("../models/NewsImage");
const Category_1 = require("../models/Category");
const NewsVisits_1 = require("../models/NewsVisits");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: String(process.env.DB_PASS),
    models: [User_1.User, News_1.News, Tag_1.Tag, NewsTag_1.NewsTag, Comment_1.Comment, NewsImage_1.NewsImage, Category_1.Category, NewsVisits_1.NewsVisits]
});
//# sourceMappingURL=database.js.map