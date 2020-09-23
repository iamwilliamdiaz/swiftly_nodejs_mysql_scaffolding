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
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_service_1 = require("./accounts.service");
const AccountsServiceInstance = new accounts_service_1.AccountsService();
/**
 * Summary: Create account
 * @description Create account
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
exports.createAccounts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    /** Express JS Validation: path, param or body, message */
    req.assert("firstname", "firstname cannot be less than 2 characters").notEmpty();
    req.assert("lastname", "lastname cannot be less than 2 characters").notEmpty();
    const _errors = req.validationErrors();
    if (_errors) {
        return {
            statusCode: 422,
            data: _errors
        };
    }
    return yield AccountsServiceInstance.createAccountsSrv(req.headers, req.params, req.body);
});
/**
 * Summary: Get account
 * @description Get account
 * @method getAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
exports.getAllAccounts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    /** Express JS Validation: path, param or body, message */
    req.assert("skip", "skip cannot be less than 2 characters").notEmpty();
    req.assert("limit", "limit cannot be less than 2 characters").notEmpty();
    req.assert("sort", "sort cannot be less than 2 characters").notEmpty();
    const _errors = req.validationErrors();
    if (_errors) {
        return {
            statusCode: 422,
            data: _errors
        };
    }
    return yield AccountsServiceInstance.getAllAccountsSrv(req.headers, req.params);
});
/**
 * Summary: Returns account information by Id
 * @description Returns account information associated with the ID requested
 * @method getAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
exports.getAccountById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    /** Express JS Validation: path, param or body, message */
    req.checkHeaders("x-session-token", "missing session token").notEmpty();
    req.assert("user_id", "user_id cannot be less than 2 characters").notEmpty();
    req.assert("user_id", "invalid user_id provided").isHash("sha1");
    const _errors = req.validationErrors();
    if (_errors) {
        return {
            statusCode: 422,
            data: _errors
        };
    }
    /** Get the account by id using the service */
    return yield AccountsServiceInstance.getAccountByIdSrvc(req.headers, req.params);
});
/**
 * Summary: Create account
 * @description Create account
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
exports.updateAccountById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    /** Express JS Validation: path, param or body, message */
    req.checkHeaders("x-session-token", "missing session token").notEmpty();
    req.assert("user_id", "user_id cannot be less than 2 characters").notEmpty();
    req.assert("user_id", "invalid user_id provided").isHash("sha1");
    req.assert("firstname", "firstname cannot be less than 2 characters").notEmpty();
    req.assert("lastname", "lastname cannot be less than 2 characters").notEmpty();
    const _errors = req.validationErrors();
    if (_errors) {
        return {
            statusCode: 422,
            data: _errors
        };
    }
    return yield AccountsServiceInstance.updateAccountByIdSrv(req.headers, req.params, req.body);
});
/**
 * Summary: Create account
 * @description Create account
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
exports.deleteAccountById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    /** Express JS Validation: path, param or body, message */
    req.checkHeaders("x-session-token", "missing session token").notEmpty();
    req.assert("user_id", "user_id cannot be less than 2 characters").notEmpty();
    req.assert("user_id", "invalid user_id provided").isHash("sha1");
    const _errors = req.validationErrors();
    if (_errors) {
        return {
            statusCode: 422,
            data: _errors
        };
    }
    return yield AccountsServiceInstance.deleteAccountByIdSrv(req.headers, req.params, req.body);
});
/**
 * Summary: Returns account information by Id
 * @description Returns account information associated with the ID requested
 * @method getAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
exports.searchAccountByCriteria = (req) => __awaiter(void 0, void 0, void 0, function* () {
    /** Express JS Validation: path, param or body, message */
    req.checkHeaders("x-session-token", "missing session token").notEmpty();
    req.assert("criteria", "criteria cannot be less than 2 characters").notEmpty();
    req.assert("criteria", "Only alphanumerics characters are allowed").isAlphanumeric();
    req.assert("criteria", "criteria cannot be less than 2 characters").escape();
    const _errors = req.validationErrors();
    if (_errors) {
        return {
            statusCode: 422,
            data: _errors
        };
    }
    /** Get the account by id using the service */
    return yield AccountsServiceInstance.searchAccountByCriteriaSrvc(req.headers, req.params, req.query);
});
//# sourceMappingURL=accounts.controllers.js.map