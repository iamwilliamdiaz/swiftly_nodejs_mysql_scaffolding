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
const oracle_connector_1 = require("./oracle.connector");
const logger_util_1 = __importDefault(require("../util/logger.util"));
const oracledb_1 = __importDefault(require("oracledb"));
var oracleDBService;
(function (oracleDBService) {
    /**
     *
     * @function executeSelectQuery
     * @export
     * @param {object} _query
     * @param {number} _binds
     * @param {Object} _options
     * @returns
     */
    function executeSelectQuery(_query, _binds, _options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let oracleConnection;
                try {
                    // Get a connection from the default pool
                    oracleConnection = yield oracle_connector_1.oracleDBConnector.getPoolConnection();
                    const options = _options || { outFormat: oracledb_1.default.OUT_FORMAT_OBJECT };
                    const _result = yield oracleConnection.execute(_query, _binds, options);
                    return resolve(_result);
                }
                catch (_err) {
                    reject(_err);
                }
                finally {
                    if (oracleConnection) {
                        try {
                            // Put the connection back in the pool
                            yield oracleConnection.close();
                        }
                        catch (_err) {
                            logger_util_1.default.error(_err);
                            return new Error(_err);
                        }
                    }
                }
            }));
        });
    }
    oracleDBService.executeSelectQuery = executeSelectQuery;
    /**
     *
     * @function executeInsertQuery
     * @export
     * @param {object} _query
     * @param {number} _binds
     * @param {Object} _options
     * @returns
     */
    function executeInsertQuery(_body, _options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let oracleConnection;
                try {
                    // Get a connection from the default pool
                    oracleConnection = yield oracle_connector_1.oracleDBConnector.getPoolConnection();
                    const _result = yield oracleConnection.execute(_body, _options);
                    return resolve(_result);
                }
                catch (_err) {
                    reject(_err);
                }
                finally {
                    if (oracleConnection) {
                        try {
                            // Put the connection back in the pool
                            yield oracleConnection.close();
                        }
                        catch (_err) {
                            logger_util_1.default.error(_err);
                            return new Error(_err);
                        }
                    }
                }
            }));
        });
    }
    oracleDBService.executeInsertQuery = executeInsertQuery;
    /**
     *
     * @function executeInsertQuery
     * @export
     * @param {object} _query
     * @returns
     */
    function executeUpdateQuery(_query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let oracleConnection;
                try {
                    // Get a connection from the default pool
                    oracleConnection = yield oracle_connector_1.oracleDBConnector.getPoolConnection();
                    const _result = yield oracleConnection.execute(_query);
                    return resolve(_result);
                }
                catch (_err) {
                    reject(_err);
                }
                finally {
                    if (oracleConnection) {
                        try {
                            // Put the connection back in the pool
                            yield oracleConnection.close();
                        }
                        catch (_err) {
                            logger_util_1.default.error(_err);
                            return new Error(_err);
                        }
                    }
                }
            }));
        });
    }
    oracleDBService.executeUpdateQuery = executeUpdateQuery;
    /**
     *
     * @function executeDeleteQuery
     * @export
     * @param {object} _query
     * @returns
     */
    function executeDeleteQuery(_query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let oracleConnection;
                try {
                    // Get a connection from the default pool
                    oracleConnection = yield oracle_connector_1.oracleDBConnector.getPoolConnection();
                    const _result = yield oracleConnection.execute(_query);
                    return resolve(_result);
                }
                catch (_err) {
                    reject(_err);
                }
                finally {
                    if (oracleConnection) {
                        try {
                            // Put the connection back in the pool
                            yield oracleConnection.close();
                        }
                        catch (_err) {
                            logger_util_1.default.error(_err);
                            return new Error(_err);
                        }
                    }
                }
            }));
        });
    }
    oracleDBService.executeDeleteQuery = executeDeleteQuery;
})(oracleDBService = exports.oracleDBService || (exports.oracleDBService = {}));
//# sourceMappingURL=oracle.service.js.map