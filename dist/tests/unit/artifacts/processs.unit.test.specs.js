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
const sinon_1 = __importDefault(require("sinon"));
const sandbox = sinon_1.default.createSandbox();
let server;
/**
 * Summary: beforeAll
 * @description Initiliaze the express server
 */
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        server = index_1.default.setup();
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
describe("Test uncaughtException", () => {
    it("should return error", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const spy = sinon_1.default.spy();
        process.on("uncaughtException", spy);
        process.emit("uncaughtException", new Error("forced error"));
        sinon_1.default.assert.calledOnce(spy);
        done();
    }));
});
/**
 * Summary: unhandledRejection
 * @description Test unhandledRejection process.
 */
describe("Test unhandledRejection", () => {
    it("should return error", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const spy = sinon_1.default.spy();
        process.on("unhandledRejection", spy);
        process.emit("unhandledRejection", "reason", new Promise(() => { }));
        sinon_1.default.assert.calledOnce(spy);
        done();
    }));
});
/**
 * Summary: SIGINT
 * @description Test SIGINT process.
 */
describe("Test SIGINT", () => {
    it("should return error", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const spy = sinon_1.default.spy();
        process.on("SIGINT", spy);
        process.emit("SIGINT");
        sinon_1.default.assert.calledOnce(spy);
        done();
    }));
});
/**
 * Summary: SIGTERM
 * @description Test SIGTERM process.
 */
describe("Test SIGTERM", () => {
    it("should return error", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const spy = sinon_1.default.spy();
        process.on("SIGTERM", spy);
        process.emit("SIGTERM");
        sinon_1.default.assert.calledOnce(spy);
        done();
    }));
});
/**
 * Summary: afterEach
 * @description afterEach restore sinon
 */
afterEach(() => {
    sinon_1.default.restore();
});
//# sourceMappingURL=processs.unit.test.specs.js.map