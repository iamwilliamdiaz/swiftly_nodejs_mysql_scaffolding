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
const sinon_1 = __importDefault(require("sinon"));
const dotenv_1 = __importDefault(require("dotenv"));
const chai_1 = require("chai");
const sandbox = sinon_1.default.createSandbox();
/**
 * Summary: beforeAll
 * @description Initiliaze the express server
 */
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    process.env.NODE_ENV = "dev";
    try {
        dotenv_1.default.config({ path: "./config.env.dev" });
        done();
    }
    catch (_err) {
        console.log(_err);
        done();
    }
}));
/**
 * Summary: uncaughtException
 * @description Test uncaughtException process.
 */
// unit tests for env file
describe("env", () => {
    it("should have a client id", () => {
        chai_1.expect(process.env.API_NAME).be.not.NaN;
    });
    it("should have a client secret", () => {
        chai_1.expect(process.env.API_PORT).be.not.NaN;
    });
    it("should have a host", () => {
        chai_1.expect(process.env.ENVIRONMENT).be.not.NaN;
    });
    it("should have a scope", () => {
        chai_1.expect(process.env.SESSION_SECRET).be.not.NaN;
    });
    it("should have a response type", () => {
        chai_1.expect(process.env.MONGO_URI).be.not.NaN;
    });
    it("should have a redirect uri", () => {
        chai_1.expect(process.env.MONGO_USERNAME).be.not.NaN;
    });
});
/**
 * Summary: afterEach
 * @description afterEach restore sinon
 */
afterEach((done) => {
    done();
});
//# sourceMappingURL=dotenv.unit.test.helper.js.map