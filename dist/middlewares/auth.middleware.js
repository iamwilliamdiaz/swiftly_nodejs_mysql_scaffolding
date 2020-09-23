"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Auth Required middleware.
 */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiResponse = __importStar(require("../util/restful.response.util"));
const secrets_util_1 = require("../util/secrets.util");
/**
 * isAuthenticated
 * @param req
 * @param res
 * @param next
 *
 */
exports.isAuthenticated = (req, res, next) => {
    if (secrets_util_1.ENABLE_TOKENIZATION === "true") {
        const token = req.headers["x-session-token"] && req.headers["x-session-token"].toString();
        jsonwebtoken_1.default.verify(`${token}`, secrets_util_1.ENABLE_TOKENIZATION_SECRET, function (err, decoded) {
            try {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        apiResponse.errorHandler(res, { "statusCode": 403, "data": err, "message": "Failed to authenticate, token expired" });
                    }
                    else {
                        apiResponse.errorHandler(res, { "statusCode": 401, "data": err, "message": "Failed to authenticate, invalid token" });
                    }
                }
                else {
                    next();
                }
            }
            catch (e) {
                apiResponse.default(res, e);
            }
        });
    }
    else {
        next();
    }
};
//# sourceMappingURL=auth.middleware.js.map