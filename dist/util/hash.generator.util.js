"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
var hashGenerator;
(function (hashGenerator) {
    /**
     *
     * @function getSignedUrl
     * @param {string} _path
     * @returns
     */
    function injectHash(_body) {
        try {
            // only hexadecimal digits
            _body.id = crypto_1.default.createHash("RSA-SHA1").update(Math.random().toString(36).substr(2, 5)).digest("hex").toString();
            _body.dateCreated = new Date();
            return _body;
        }
        catch (_error) {
            return "error";
        }
    }
    hashGenerator.injectHash = injectHash;
    function getUniqueHash(length) {
        try {
            // only hexadecimal digits
            return crypto_1.default.createHash("RSA-SHA1").update(Math.random().toString(length || 36).substr(2, 5)).digest("hex").toString();
        }
        catch (_error) {
            return "error";
        }
    }
    hashGenerator.getUniqueHash = getUniqueHash;
})(hashGenerator = exports.hashGenerator || (exports.hashGenerator = {}));
//# sourceMappingURL=hash.generator.util.js.map