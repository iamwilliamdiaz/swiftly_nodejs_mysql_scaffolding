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
const token_generator_test_helper_1 = require("../../helpers/token.generator.test.helper");
const index_1 = __importDefault(require("../../../index"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
let server;
let token;
const account = {
    user_id: 0
};
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
        /**
         * Summary: Instantiate express app server
         * @description
         * @beta
         */
        token = token_generator_test_helper_1.generateToken("integration", 36000);
        server = index_1.default.setup();
        /**
         * Summary: post request to create a new account
         * @description
         * @beta
         */
        const response = yield supertest_1.default(server).post("/accounts")
            .send({ firstname: "Joe", lastname: "Doe" })
            .set({ "x-session-token": token, "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(200);
        chai_1.assert.isNotEmpty(response.body.result);
        chai_1.assert.isArray(response.body.result);
        account.user_id = (response && response.body && response.body.result && response.body.result[0].user_id) ? response.body.result[0].user_id : 0;
        done();
    }
    catch (_err) {
        console.log(_err);
        done();
    }
}));
/**
 * Summary:
 * @description
 * @method getAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Get Accounts Details - 200 Integration", () => {
    it("should return 200", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/accounts/${account.user_id}`)
            .set({ "x-session-token": token, "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body.result);
            chai_1.assert.isArray(response.body.result);
            chai_1.assert.strictEqual(response.body.result[0].user_id, account.user_id);
            done();
        });
    }));
});
/**
 * Summary:
 * @description
 * @method updateAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Update Accounts Details - 204 Integration", () => {
    it("should return 204", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).put(`/accounts/${account.user_id}`)
            .set({ "x-session-token": token, "Accept": "application/json" })
            .send({ "firstname": "John", "lastname": "Doe" });
        done();
    }));
});
/**
 * Summary:
 * @description
 * @method updateAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Search Accounts Details - 200 Integration", () => {
    const _criteria = "Doe";
    it("should return 200", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/accounts/search/${_criteria}`)
            .set({ "x-session-token": token, "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body.result);
            chai_1.assert.isArray(response.body.result);
            done();
        });
    }));
});
/**
 * Summary:
 * @description
 * @method updateAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Error Search Accounts Details - 503 Integration", () => {
    const _criteria = "'^";
    it("should return 503 error", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/accounts/search/${_criteria}`)
            .set({ "x-session-token": token, "Accept": "application/json" })
            .query({ "limit": "1", "sort": "_error" })
            .expect("Content-Type", /json/)
            .expect(503)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body);
            done();
        });
    }));
});
/**
 * Summary:
 * @description
 * @method getAcpGroupsById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Get Accounts Details with invalid token - 401 Integration", () => {
    it("should return 403", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/accounts/${account.user_id}`)
            .set({ "x-session-token": "0000000000000", "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(401)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body.result);
            chai_1.assert.isObject(response.body.result);
            done();
        });
    }));
});
/**
 * Summary:
 * @description
 * @method getAcpGroupsById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
describe("Get Accounts Details with expired token - 403 Integration", () => {
    it("should return 403", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/accounts/${account.user_id}`)
            .set({ "x-session-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwIiwibmFtZSI6IjIwMjAtMDgtMjdUMjM6NDk6MDAuNjAzWiIsImlhdCI6MTU5ODU3MjE0MCwiZXhwIjoxNTk4NTcyNTAwfQ.h6EsV0gFC_jtxsQ13_j5cRfEAYJyxBti-sAeZ-7BB18", "Accept": "application/json" })
            .expect("Content-Type", /json/)
            .expect(403)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body.result);
            chai_1.assert.isObject(response.body.result);
            done();
        });
    }));
});
afterAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    if (server) {
        yield supertest_1.default(server).delete(`/accounts/${account.user_id}`)
            .set({ "x-session-token": token, "Accept": "application/json" })
            .expect(204);
        done();
        index_1.default.kill();
    }
}));
//# sourceMappingURL=accounts.integration.test.specs.js.map