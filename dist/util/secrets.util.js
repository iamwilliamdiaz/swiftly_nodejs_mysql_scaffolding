"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
if (fs_1.default.existsSync(".env")) {
    dotenv_1.default.config({ "path": ".env" });
}
else {
    dotenv_1.default.config({ "path": ".env.dev" });
}
/***
 * Why checkENV? Branching coverage in integration and unit testing
 */
exports.API_NAME = process.env.API_NAME;
(checkENV(exports.API_NAME));
exports.API_PORT = process.env.API_PORT;
(checkENV(exports.API_PORT));
exports.ENVIRONMENT = process.env.NODE_ENV;
(checkENV(exports.ENVIRONMENT));
exports.SESSION_SECRET = process.env.SESSION_SECRET;
(checkENV(exports.SESSION_SECRET));
exports.MONGO_USERNAME = process.env.MONGO_USERNAME;
(checkENV(exports.MONGO_USERNAME));
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD;
(checkENV(exports.MONGO_PASSWORD));
exports.MONGO_URI = process.env.MONGO_URI;
(checkENV(exports.MONGO_URI));
exports.MYSQL_USERNAME = process.env.MYSQL_USERNAME;
(checkENV(exports.MYSQL_USERNAME));
exports.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
(checkENV(exports.MYSQL_PASSWORD));
exports.MYSQL_CONNECTION_STRING = process.env.MYSQL_CONNECTION_STRING;
(checkENV(exports.MYSQL_CONNECTION_STRING));
exports.ENABLE_TOKENIZATION = process.env.ENABLE_TOKENIZATION;
(checkENV(exports.ENABLE_TOKENIZATION));
exports.ENABLE_TOKENIZATION_SECRET = process.env.ENABLE_TOKENIZATION_SECRET;
(checkENV(exports.ENABLE_TOKENIZATION_SECRET));
exports.LOGLEVEL = process.env.LOGLEVEL;
(checkENV(exports.LOGLEVEL));
/* istanbul ignore next */
function checkENV(_envVar) {
    if (!_envVar) {
        throw new Error(`Problems to read the ${_envVar} in the .env file`);
    }
}
//# sourceMappingURL=secrets.util.js.map