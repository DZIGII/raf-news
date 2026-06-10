"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./database/database");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const user_router_1 = __importDefault(require("./routes/user.router"));
const news_router_1 = __importDefault(require("./routes/news.router"));
const category_router_1 = __importDefault(require("./routes/category.router"));
const comment_router_1 = __importDefault(require("./routes/comment.router"));
const tag_router_1 = __importDefault(require("./routes/tag.router"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use('/uploads', express_1.default.static('uploads'));
app.use("/users", user_router_1.default);
app.use("/news", news_router_1.default);
app.use("/categories", category_router_1.default);
app.use("/comments", comment_router_1.default);
app.use("/tags", tag_router_1.default);
app.get('/', (_req, res) => {
    res.json({ message: 'test' });
});
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connected');
    return database_1.sequelize.sync({ force: false });
})
    .then(() => console.log('Tables synced'))
    .catch((err) => console.error('Database error:', err.message));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map