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
const mysql_connector_1 = require("./mysql.connector");
const logger_util_1 = __importDefault(require("../util/logger.util"));
var mySQLDBService;
(function (mySQLDBService) {
    /**
     *
     * @function executeSelectQuery
     * @export
     * @param {object} _query
     * @param {number} _binds
     * @param {Object} _options
     * @returns
     */
    function executeQuery(_query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let mySQLConnection;
                try {
                    /** Get a connection from the default pool */
                    mySQLConnection = yield mysql_connector_1.mySQLDBConnector.getPoolConnection();
                    yield mySQLConnection.query(_query, function (_err, _result, fields) {
                        if (_err) {
                            reject(_err);
                        }
                        return resolve(_result);
                    });
                }
                catch (_err) {
                    /** Reject the request in case of connection issues */
                    reject(_err);
                }
                finally {
                    if (mySQLConnection) {
                        try {
                            /** Put the connection back in the pool */
                            yield mySQLConnection.release();
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
    mySQLDBService.executeQuery = executeQuery;
    /**
     *
     * @function executeSelectQuery
     * @export
     * @param {object} _query
     * @param {number} _binds
     * @param {Object} _options
     * @returns
     *
     * Please note that beginTransaction(), commit() and rollback() are simply convenience functions
     * that execute the START TRANSACTION, COMMIT, and ROLLBACK commands respectively. It is
     * important to understand that many commands in MySQL can cause an implicit commit,
     * as described in the MySQL documentation
     *
     */
    function executeTransactionalQuery(_query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let mySQLConnection;
                try {
                    /** Get pool connection */
                    mySQLConnection = yield mysql_connector_1.mySQLDBConnector.getPoolConnection();
                    /** Get the connection from the pool  */
                    mySQLConnection.getConnection((_err, _connection) => {
                        if (_err) {
                            return reject(_err);
                        }
                        /** Start a new transaction.  */
                        _connection.beginTransaction((_err) => {
                            if (_err) {
                                return reject(_err);
                            }
                            /** Query the database  */
                            _connection.query(_query, (error, _result, fields) => {
                                if (error) {
                                    /** Cancel the existing transaction.  */
                                    return _connection.rollback(() => {
                                        return reject(error);
                                    });
                                }
                                /** Make the changes permanents.  */
                                _connection.commit((err) => {
                                    if (err) {
                                        return _connection.rollback(function () {
                                            throw err;
                                        });
                                    }
                                    return resolve(_result);
                                });
                            });
                        });
                    });
                }
                catch (_err) {
                    /** Reject the request in case of connection issues */
                    reject(_err);
                }
                finally {
                    if (mySQLConnection) {
                        try {
                            /** Put the connection back in the pool */
                            yield mySQLConnection.release();
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
    mySQLDBService.executeTransactionalQuery = executeTransactionalQuery;
})(mySQLDBService = exports.mySQLDBService || (exports.mySQLDBService = {}));
//# sourceMappingURL=mysql.service.js.map