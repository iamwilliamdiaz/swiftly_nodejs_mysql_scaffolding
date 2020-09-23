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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const mod = yield Promise.resolve().then(() => __importStar(require("../../index")));
    server = mod.default;
}));
afterAll((done) => {
    if (server) {
        //  server.kill(done);
    }
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
describe("GET /accounts/:id ", () => {
    it("should return 403", (done) => {
        supertest_1.default(server).get("/accounts/:id ")
            .expect(403, done);
        done();
    });
});
//# sourceMappingURL=accounts.test.integration.specs.js.map