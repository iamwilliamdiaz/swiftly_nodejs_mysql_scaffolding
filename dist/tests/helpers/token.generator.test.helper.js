"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_util_1 = require("../../util/secrets.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *
 * @function generateToken
 * @param {string} _key
 * @returns
 */
function generateToken(_key, _expireIn) {
    try {
        const payload = {
            id: _key,
            name: new Date()
        };
        return jsonwebtoken_1.default.sign(payload, secrets_util_1.ENABLE_TOKENIZATION_SECRET, { expiresIn: 36000 });
    }
    catch (_error) {
        return "error";
    }
}
exports.generateToken = generateToken;
//# sourceMappingURL=token.generator.test.helper.js.map