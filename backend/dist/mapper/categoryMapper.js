"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCategoryResponseDto = toCategoryResponseDto;
function toCategoryResponseDto(category) {
    const d = category.toJSON();
    return {
        categoryId: d.categoryId,
        name: d.name,
        description: d.description
    };
}
//# sourceMappingURL=categoryMapper.js.map