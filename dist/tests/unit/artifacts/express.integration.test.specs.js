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
const index_1 = __importDefault(require("../../../index"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
let server;
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
         */
        server = index_1.default.setup();
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
describe("Positive check for api version information - Success", () => {
    it("should return 200", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/version`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body);
            done();
        });
    }));
});
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
describe("Negative check for api version information - Fail", () => {
    it("should return 403", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield supertest_1.default(server).get(`/wrong-url`)
            .expect("Content-Type", /json/)
            .expect(403)
            .then(response => {
            chai_1.assert.isNotEmpty(response.body);
            done();
        });
    }));
});
afterAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    done();
}));
//# sourceMappingURL=express.integration.test.specs.js.map