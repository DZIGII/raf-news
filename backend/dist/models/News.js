"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./User");
const Tag_1 = require("./Tag");
const NewsTag_1 = require("./NewsTag");
const Comment_1 = require("./Comment");
const NewsImage_1 = require("./NewsImage");
const Category_1 = require("./Category");
let News = class News extends sequelize_typescript_1.Model {
};
exports.News = News;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_id"
    }),
    __metadata("design:type", Number)
], News.prototype, "newsId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "title"
    }),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
        field: "text"
    }),
    __metadata("design:type", String)
], News.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], News.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], News.prototype, "like", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], News.prototype, "dislike", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => User_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "user_id",
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], News.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1.Category),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "category_id"
    }),
    __metadata("design:type", Number)
], News.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Category_1.Category),
    __metadata("design:type", Category_1.Category)
], News.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => User_1.User),
    __metadata("design:type", User_1.User)
], News.prototype, "createdBy", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Tag_1.Tag, () => NewsTag_1.NewsTag),
    __metadata("design:type", Array)
], News.prototype, "tags", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment_1.Comment, { onDelete: 'CASCADE', hooks: true }),
    __metadata("design:type", Array)
], News.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => NewsImage_1.NewsImage, { onDelete: 'CASCADE', hooks: true }),
    __metadata("design:type", Array)
], News.prototype, "images", void 0);
exports.News = News = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "news",
        timestamps: false
    })
], News);
//# sourceMappingURL=News.js.map