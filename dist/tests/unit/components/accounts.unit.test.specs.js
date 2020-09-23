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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Accounts = __importStar(require("../../../core/accounts/accounts.controllers"));
const expressValidator = __importStar(require("../../helpers/express.validator.test.helper"));
const token_generator_test_helper_1 = require("../../helpers/token.generator.test.helper");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const chai_1 = require("chai");
let token;
let mockAccountsReq;
/**
 * Summary:
 * @description
 * @method beforeAll
 * @returns index.ts
 *
 * @beta
 */
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        token = token_generator_test_helper_1.generateToken("integration", 36000);
        done();
    }
    catch (_err) {
        done();
    }
}));
/**
 * Summary: Positive testing to get accounts details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method getAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Positive testing to get accounts details - Success", () => {
    it("should return 200 OK", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest({
            method: "GET",
            url: "/account/12345",
            params: {
                user_id: 12345
            }
        });
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);
        try {
            const _result = yield Accounts.getAccountById(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(200);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Negative testing to get accounts details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method Accounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Negative testing to get accounts details - Fail", () => {
    it("should return 422 code", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest({
            method: "GET",
            url: "/account/"
        });
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["user_id"]);
        try {
            const _result = yield Accounts.getAccountById(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(422);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Positive testing to create accounts details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Positive testing to create accounts details - Success", function () {
    it("should return 200 OK", (done) => __awaiter(this, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);
        try {
            const _result = yield Accounts.createAccounts(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(200);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Negative testing to create accounts details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Negative testing to create accounts details - Fail", () => {
    it("should return 422 code", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["firstname", "lastname"]);
        try {
            const _result = yield Accounts.createAccounts(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(422);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Positive testing to update account details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method updateAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Positive testing to update account details - Success", function () {
    it("should return 204 OK", (done) => __awaiter(this, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);
        try {
            const _result = yield Accounts.updateAccountById(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(204);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Negative testing to update account details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method updateAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Negative testing to update account details - Fail", () => {
    it("should return 422 code", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["firstname", "lastname"]);
        try {
            const _result = yield Accounts.updateAccountById(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(422);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Positive testing to delete account details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method deleteAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Positive testing to delete account details - Success", function () {
    it("should return 204 OK", (done) => __awaiter(this, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);
        try {
            const _result = yield Accounts.deleteAccountById(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(204);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Negative testing to delete account details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method deleteAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Negative testing to delete account details - Fail", () => {
    it("should return 422 code", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["firstname", "lastname"]);
        try {
            const _result = yield Accounts.deleteAccountById(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(422);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Positive testing to search account details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method searchAccountByCriteria
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Positive testing to search account details - Success", function () {
    it("should return 204 OK", (done) => __awaiter(this, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.body = {
            criteria: "doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);
        try {
            const _result = yield Accounts.searchAccountByCriteria(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(200);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
/**
 * Summary: Negative testing to search account details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method searchAccountByCriteria
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Negative testing to search account details - Fail", () => {
    it("should return 422 code", (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["doe"]);
        try {
            const _result = yield Accounts.searchAccountByCriteria(mockAccountsReq);
            chai_1.expect(_result.statusCode).to.be.equals(422);
        }
        catch (_err) {
            chai_1.expect(_err.statusCode).to.be.equals(500);
        }
        done();
    }));
});
//# sourceMappingURL=accounts.unit.test.specs.js.map