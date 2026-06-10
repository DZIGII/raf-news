"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.roleMiddleware = roleMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../config/jwt.config");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}
function roleMiddleware(...allowedRoles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: 'Not authenticated' });
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
//# sourceMappingURL=auth.middleware.js.map