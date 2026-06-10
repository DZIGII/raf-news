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
exports.NewsVisits = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const News_1 = require("./News");
let NewsVisits = class NewsVisits extends sequelize_typescript_1.Model {
};
exports.NewsVisits = NewsVisits;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_visits_id"
    }),
    __metadata("design:type", Number)
], NewsVisits.prototype, "newsVisitsId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => News_1.News),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false,
        field: "news_id",
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], NewsVisits.prototype, "newsId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => News_1.News),
    __metadata("design:type", News_1.News)
], NewsVisits.prototype, "news", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "visited_at",
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], NewsVisits.prototype, "visitedAt", void 0);
exports.NewsVisits = NewsVisits = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "news_visits",
        timestamps: false
    })
], NewsVisits);
//# sourceMappingURL=NewsVisits.js.map