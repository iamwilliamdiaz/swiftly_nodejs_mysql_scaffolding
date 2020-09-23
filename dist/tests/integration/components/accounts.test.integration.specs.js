"use strict";
// import request from "supertest";
//
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
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
const should = chai_1.default.should();
const expect = chai_1.default.expect;
let server;
beforeAll((done) => {
    const mod = Promise.resolve().then(() => __importStar(require("../../../index")));
    server = mod.default;
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
// describe("GET /accounts/:id ", () => {
//     it("should return 403", async (done) => {
//         await request(server).get("/accounts/:id ")
//             .expect(403, done);
//     });
// });
describe("GET /accounts/:id ", () => {
    it("should return a list of films when called", (done) => __awaiter(void 0, void 0, void 0, function* () {
        yield chai_1.default
            .request(server)
            .get("/accounts/:id")
            .end((err, res) => {
            res.should.have.status(200);
            // expect(res.body).to.deep.equal(starwarsFilmListMock);
            done();
        });
    }));
});
// afterAll((done) => {
//     if (server) {
//         //  server.kill(done);
//     }
//   //  done();
// });
//# sourceMappingURL=accounts.test.integration.specs.js.map