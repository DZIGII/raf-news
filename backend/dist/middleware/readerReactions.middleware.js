"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readerReactions = readerReactions;
exports.setReactionsCookie = setReactionsCookie;
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
function readerReactions(req, res, next) {
    try {
        const raw = req.cookies?.reactions;
        req.reactions = raw ? JSON.parse(raw) : { liked: [], disliked: [] };
    }
    catch {
        req.reactions = { liked: [], disliked: [] };
    }
    next();
}
function setReactionsCookie(res, reactions) {
    res.cookie('reactions', JSON.stringify(reactions), {
        httpOnly: false,
        sameSite: 'lax',
        maxAge: ONE_YEAR_MS
    });
}
//# sourceMappingURL=readerReactions.middleware.js.map