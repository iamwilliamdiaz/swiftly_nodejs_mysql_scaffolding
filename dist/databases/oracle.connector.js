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
const oracledb_1 = __importDefault(require("oracledb"));
const logger_util_1 = __importDefault(require("../util/logger.util"));
let connectionPool;
var oracleDBConnector;
(function (oracleDBConnector) {
    /**
     *
     * @function getPoolConnection
     * @export
     * @returns connectionPool
     */
    function getPoolConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connectionPool) {
                connectionPool = yield setConnection();
                return connectionPool;
            }
            return connectionPool;
        });
    }
    oracleDBConnector.getPoolConnection = getPoolConnection;
    function setConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield oracledb_1.default.createPool({
                    user: secrets_util_1.ORACLE_USERNAME,
                    password: secrets_util_1.ORACLE_PASSWORD,
                    connectString: secrets_util_1.ORACLE_CONNECTION_STRING,
                    edition: "ORA$BASE",
                    events: false,
                    externalAuth: false,
                    homogeneous: true,
                    poolAlias: "default",
                    poolIncrement: 1,
                    poolMax: 4,
                    poolMin: 0,
                    poolPingInterval: 60,
                    poolTimeout: 60,
                    queueMax: 500,
                    queueTimeout: 60000,
                    stmtCacheSize: 30,
                    _enableStats: false // record pool usage statistics that can be output with pool._logStats()
                    //  sessionCallback: myFunction, // function invoked for brand new connections or by a connection tag mismatch
                });
            }
            catch (_err) {
                logger_util_1.default.error(_err);
                return new Error(_err);
            }
            finally {
                yield closePoolAndExit();
            }
        });
    }
    function closePoolAndExit() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\nTerminating Oracle Connection Pool");
            try {
                // Get the pool from the pool cache and close it when no
                // connections are in use, or force it closed after 10 seconds.
                // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
                // This setting should not be needed if both Oracle Client and Oracle
                // Database are 19c (or later).
                yield oracledb_1.default.getPool().close(10);
                console.log("Pool closed");
            }
            catch (_err) {
                logger_util_1.default.error(_err);
            }
        });
    }
})(oracleDBConnector = exports.oracleDBConnector || (exports.oracleDBConnector = {}));
//# sourceMappingURL=oracle.connector.js.map