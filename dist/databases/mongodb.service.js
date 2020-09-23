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
const mongodb_connector_1 = require("./mongodb.connector");
const logger_util_1 = __importDefault(require("../util/logger.util"));
var mongoDBService;
(function (mongoDBService) {
    /**
     *
     * @function setConnection
     * @param {string} _databaseName
     * @returns
     */
    function getMongoDBInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongodb_connector_1.mongoDBConnector.getPoolConnection();
            }
            catch (_error) {
                logger_util_1.default.error(_error);
                return new Error(_error);
            }
        });
    }
    /**
     *
     * @function findDoc
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _query
     * @returns
     */
    function findDoc(_db, _model, _query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbInstance = yield getMongoDBInstance();
                const collection = yield dbInstance.db(_db).collection(_model);
                yield collection.find(_query).toArray((_err, _result) => __awaiter(this, void 0, void 0, function* () {
                    if (_err) {
                        reject(_err);
                    }
                    return resolve(_result);
                }));
            }));
        });
    }
    mongoDBService.findDoc = findDoc;
    /**
     *
     * @function findDocByAggr
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _query
     * @returns
     */
    // export async function findDocByAggr(_db: string, _model: string, _query: any) {
    //   return new Promise(async (resolve, reject) => {
    //     const dbInstance = await getMongoDBInstance();
    //     const collection = await dbInstance.db(_db).collection(_model);
    //     await collection.aggregate(_query).toArray(async (_err: any, _result: any) => {
    //       if (_err) {
    //         reject(_err);
    //       }
    //       return resolve(_result);
    //     });
    //   });
    // }
    /**
     *
     * @function createDoc
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _body
     * @returns
     */
    function createDoc(_db, _model, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbInstance = yield getMongoDBInstance();
                const collection = yield dbInstance.db(_db).collection(_model);
                yield collection.insertOne(_body, (_err, _result) => {
                    if (_err) {
                        reject(_err);
                    }
                    return resolve(_result);
                });
            }));
        });
    }
    mongoDBService.createDoc = createDoc;
    /**
     *
     * @function updateDoc
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _body
     * @returns
     */
    function updateDoc(_db, _model, _query, _body) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbInstance = yield getMongoDBInstance();
                const collection = yield dbInstance.db(_db).collection(_model);
                yield collection.update(_query, _body, {
                    upsert: true
                }, function (_err, _result) {
                    if (_err) {
                        reject(_err);
                    }
                    return resolve(_result);
                });
            }));
        });
    }
    mongoDBService.updateDoc = updateDoc;
    /**
     *
     * @function deleteDoc
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _body
     * @returns
     */
    function deleteDoc(_db, _model, _params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbInstance = yield getMongoDBInstance();
                const collection = yield dbInstance.db(_db).collection(_model);
                yield collection.deleteOne(_params, (_err, _result) => {
                    if (_err) {
                        reject(_err);
                    }
                    return resolve(_result);
                });
            }));
        });
    }
    mongoDBService.deleteDoc = deleteDoc;
    /**
     *
     * @function searchDoc
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _body
     * @returns
     */
    function searchDoc(_db, _model, _query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const dbInstance = yield getMongoDBInstance();
                const collection = yield dbInstance.db(_db).collection(_model);
                const searchSkip = (parseInt(_query.skip)) || 0;
                const searchlimit = (parseInt(_query.limit)) || 1;
                const searchSort = _query.sort || { _id: -1 };
                yield collection.aggregate(_query.criteria).skip(searchSkip).limit(searchlimit).sort(searchSort).toArray((_err, _result) => {
                    if (_err) {
                        reject(_err);
                    }
                    return resolve(_result);
                });
            }));
        });
    }
    mongoDBService.searchDoc = searchDoc;
})(mongoDBService = exports.mongoDBService || (exports.mongoDBService = {}));
//# sourceMappingURL=mongodb.service.js.map