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
exports.Comment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const News_1 = require("./News");
let Comment = class Comment extends sequelize_typescript_1.Model {
};
exports.Comment = Comment;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        field: "comment_id"
    }),
    __metadata("design:type", Number)
], Comment.prototype, "commentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        field: "author_name"
    }),
    __metadata("design:type", String)
], Comment.prototype, "authorName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Comment.prototype, "like", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Comment.prototype, "dislike", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => News_1.News),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_id"
    }),
    __metadata("design:type", Number)
], Comment.prototype, "newsId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => News_1.News),
    __metadata("design:type", News_1.News)
], Comment.prototype, "news", void 0);
exports.Comment = Comment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "comments",
        timestamps: false
    })
], Comment);
//# sourceMappingURL=Comment.js.map