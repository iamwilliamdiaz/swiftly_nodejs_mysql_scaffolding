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
const mongodb_1 = require("mongodb");
const logger_util_1 = __importDefault(require("../util/logger.util"));
const uri = `mongodb://${secrets_util_1.MONGO_USERNAME}:${secrets_util_1.MONGO_PASSWORD}@${secrets_util_1.MONGO_URI}`;
let dbinstance;
var mongoDBConnector;
(function (mongoDBConnector) {
    /**
     *
     * @function getPoolConnection
     * @export
     * @returns dbinstance
     */
    function getPoolConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dbinstance) {
                dbinstance = yield setConnection();
                return dbinstance;
            }
            return dbinstance;
        });
    }
    mongoDBConnector.getPoolConnection = getPoolConnection;
    function setConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongodb_1.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
                    .then((dbo) => {
                    return dbo;
                })
                    .catch((err) => {
                    return err;
                });
            }
            catch (_error) {
                logger_util_1.default.error(_error);
                return new Error(_error);
            }
        });
    }
})(mongoDBConnector = exports.mongoDBConnector || (exports.mongoDBConnector = {}));
//# sourceMappingURL=mongodb.connector.js.map