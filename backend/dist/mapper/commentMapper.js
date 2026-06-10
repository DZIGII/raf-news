"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCommetResponsenDto = toCommetResponsenDto;
function toCommetResponsenDto(comment) {
    const d = comment.toJSON();
    return {
        commentId: d.commentId,
        authorName: d.authorName,
        content: d.content,
        createdAt: d.createdAt,
        like: d.like,
        dislike: d.dislike
    };
}
//# sourceMappingURL=commentMapper.js.map