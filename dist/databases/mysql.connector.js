"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_util_1 = require("../util/secrets.util");
const mysql_1 = __importDefault(require("mysql"));
const logger_util_1 = __importDefault(require("../util/logger.util"));
let dbConnection;
var mySQLDBConnector;
(function (mySQLDBConnector) {
    /**
     *
     * @function getPoolConnection
     * @export
     * @returns dbConnection
     */
    function getPoolConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dbConnection) {
                dbConnection = yield setPoolConnection().then((myConnectionPool) => {
                    return myConnectionPool;
                });
            }
            return dbConnection;
        });
    }
    mySQLDBConnector.getPoolConnection = getPoolConnection;
    function setPoolConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return mysql_1.default.createPool({
                    connectionLimit: 10,
                    host: secrets_util_1.MYSQL_CONNECTION_STRING,
                    user: secrets_util_1.MYSQL_USERNAME,
                    password: secrets_util_1.MYSQL_PASSWORD,
                });
            }
            catch (_err) {
                logger_util_1.default.error(_err);
                return new Error(_err);
            }
            finally {
                yield closePool();
            }
        });
    }
    function closePool() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (yield dbConnection) && dbConnection.destroy();
            }
            catch (_err) {
                logger_util_1.default.error(_err);
            }
        });
    }
})(mySQLDBConnector = exports.mySQLDBConnector || (exports.mySQLDBConnector = {}));
//# sourceMappingURL=mysql.connector.js.map