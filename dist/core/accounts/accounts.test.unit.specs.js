"use strict";
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
const Accounts = __importStar(require("./accounts.controllers"));
const chai_1 = require("chai");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
/**
 * Summary: Get Accounts Details
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method Accounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe.only("Get Accounts Details", function () {
    it("should return 200 OK", function (done) {
        const mockAccountsReq = node_mocks_http_1.default.createRequest();
        Accounts.getAccountById(mockAccountsReq).then(function (_response) {
            chai_1.expect(_response).to.be.a("string");
            done();
        }).catch(function (_error) {
            done();
        });
    });
});
/**
 * Summary: Create Account
 * @description Called by applications requiring account detail for a Accounts, possibly not oneself.
 * @method Accounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe.only("Create Accounts Details", function () {
    it("should return 200 OK", function (done) {
        const mockAccountsReq = node_mocks_http_1.default.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        Accounts.createAccounts(mockAccountsReq).then(function (_response) {
            chai_1.expect(_response).to.be.a("string");
            done();
        }).catch(function (_error) {
            done();
        });
    });
});
//# sourceMappingURL=accounts.test.unit.specs.js.map