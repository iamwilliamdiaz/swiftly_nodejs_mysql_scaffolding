"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_util_1 = require("../util/secrets.util");
const logger_util_1 = __importDefault(require("../util/logger.util"));
const { DataSource } = require("loopback-datasource-juggler"); // NOSONAR
const MongoDb = require("loopback-connector-mongodb"); // NOSONAR
const config = {
    "host": "http://playvuecluster-im2vm.mongodb.net",
    "port": 27017,
    "url": `mongodb://${secrets_util_1.MONGO_USERNAME}:${secrets_util_1.MONGO_PASSWORD}@${secrets_util_1.MONGO_URI}`,
    "database": "sample_airbnb",
    "password": `${secrets_util_1.MONGO_PASSWORD}`,
    "name": `admin`,
    "user": `${secrets_util_1.MONGO_USERNAME}`,
    "debug": true,
    "connector": "mongodb"
};
var mongoDB;
(function (mongoDB) {
    /**
     *
     * @function setConnection
     * @param {string} _databaseName
     * @returns
     */
    function setConnection(_databaseName) {
        try {
            config.database = _databaseName;
            return new DataSource(MongoDb, config);
        }
        catch (_error) {
            logger_util_1.default.error(_error);
            throw new Error(_error);
        }
    }
    /**
     *
     * @function runQuery
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _query
     * @returns {Promise<Object>}
     */
    function findDoc(_db, _model, _query) {
        return new Promise((resolve, reject) => {
            const dsConnection = setConnection(_db);
            const _model = "listingsAndReviews";
            dsConnection.once("connected", () => {
                const useModel = dsConnection.define(_model, { "name": { "type": String } });
                useModel.find({ "_id": "10030955" }).then((_result, _err) => {
                    if (_err) {
                        return reject(_err);
                    }
                    return resolve((_result) ? _result : []);
                });
            });
        }).catch((Error) => {
            logger_util_1.default.error(Error);
            return Promise.reject("Something bad happened with the parameters to the DB when running query");
        });
    }
    mongoDB.findDoc = findDoc;
    /**
     *
     * @function runQueryById
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {string} _id
     * @returns
     */
    function runQueryById(_db, _model, _id) {
        return new Promise((resolve, reject) => {
            const dsConnection = setConnection(_db);
            dsConnection.once("connected", () => {
                const useModel = dsConnection.define(_model, { "name": { "type": String } });
                useModel.findById(_id).then((_byidresult, _byiderr) => {
                    if (_byiderr) {
                        return reject(_byiderr);
                    }
                    return resolve((_byidresult) ? _byidresult : []);
                });
            });
            dsConnection.once("disconnected", (_dcserr) => {
                return reject(_dcserr);
            });
            dsConnection.once("error", (_dserr) => {
                return reject(_dserr);
            });
        }).catch((Error) => {
            logger_util_1.default.error(Error);
            return Promise.reject("Something bad happened with the parameters to the DB when running query");
        });
    }
    mongoDB.runQueryById = runQueryById;
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
        return new Promise((resolve, reject) => {
            const dsConnection = setConnection(_db);
            dsConnection.once("connected", () => {
                const useModel = dsConnection.define(_model, { "name": { "type": String } });
                useModel.create(_body).then((_createdocresult, _createdocerr) => {
                    if (_createdocerr) {
                        return reject(_createdocerr);
                    }
                    return resolve((_createdocresult) ? _createdocresult : []);
                });
            });
        }).catch((Error) => {
            logger_util_1.default.error(Error);
            return Promise.reject("Something bad happened with the parameters to the DB when creating document");
        });
    }
    mongoDB.createDoc = createDoc;
    /**
     *
     * @function updateDoc
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _body
     * @returns
     */
    function updateDoc(_db, _model, _body) {
        return new Promise((resolve, reject) => {
            const dsConnection = setConnection(_db);
            dsConnection.once("connected", () => {
                const useModel = dsConnection.define(_model, { "name": { "type": String } });
                // tslint:disable-next-line: comment-format
                useModel.updateOrCreate(_body).then((_result, _err) => {
                    if (_err) {
                        return reject(_err);
                    }
                    return resolve((_result) ? _result : []);
                });
            });
        }).catch((Error) => {
            logger_util_1.default.error(Error);
            return Promise.reject("Something bad happened with the parameters to the DB when updating document");
        });
    }
    mongoDB.updateDoc = updateDoc;
    /**
     *
     * @function deleteDoc
     * @export
     * @param {string} _db
     * @param {string} _model
     * @param {object} _body
     * @returns
     */
    function deleteDoc(_db, _model, _body) {
        return new Promise((resolve, reject) => {
            const dsConnection = setConnection(_db);
            dsConnection.once("connected", () => {
                const useModel = dsConnection.define(_model, { "name": { "type": String } });
                useModel.replaceOrCreate(_body).then((_result, _err) => {
                    if (_err) {
                        return reject("There is a problem to add document to the DB");
                    }
                    return resolve((_result) ? _result : []);
                });
            });
        }).catch((Error) => {
            logger_util_1.default.error(Error);
            return Promise.reject("Something bad happened with the parameters to the DB when deleting document");
        });
    }
    mongoDB.deleteDoc = deleteDoc;
    /**
     * @function viewDocs
     * @param _db
     * @param _viewdoc
     * @param _viewname
     * @param _filter
     */
    function viewDocs(_db, _viewdoc, _viewname, _filter) {
        return new Promise((resolve, reject) => {
            const dsConnection = setConnection(_db);
            dsConnection.once("connected", () => {
                // tslint:disable-next-line: comment-format
                dsConnection.connector.viewDocs(_viewdoc, _viewname, _filter, function (_viewErr, _viewResult) {
                    if (_viewErr) {
                        return reject("There is a problem to view the document from the DB");
                    }
                    return resolve((_viewResult) ? _viewResult : []);
                });
            });
        }).catch((Error) => {
            logger_util_1.default.error(Error);
            return Promise.reject("Something bad happened with the parameters to the DB when fetching views");
        });
    }
    mongoDB.viewDocs = viewDocs;
})(mongoDB = exports.mongoDB || (exports.mongoDB = {}));
//# sourceMappingURL=mongodb.loopback.util.js.map