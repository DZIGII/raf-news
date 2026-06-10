"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTagResponseDto = toTagResponseDto;
function toTagResponseDto(tag) {
    const d = tag.toJSON();
    return {
        tagId: d.tagId,
        keyword: d.keyword
    };
}
//# sourceMappingURL=tagMapper.js.map