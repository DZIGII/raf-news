"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsImageRepository = void 0;
const NewsImage_1 = require("../models/NewsImage");
class NewsImageRepository {
    async create(newsId, imageUrl) {
        return NewsImage_1.NewsImage.create({ newsId, imageUrl });
    }
}
exports.NewsImageRepository = NewsImageRepository;
//# sourceMappingURL=newsImage.repository.js.map