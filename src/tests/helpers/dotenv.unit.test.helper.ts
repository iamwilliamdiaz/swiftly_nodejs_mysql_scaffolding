import sinon from "sinon";
import dotenv from "dotenv";
import { expect } from "chai";

const sandbox = sinon.createSandbox();


/**
 * Summary: beforeAll
 * @description Initiliaze the express server
 */
beforeAll(async (done) => {

    process.env.NODE_ENV = "dev";

    try {
        dotenv.config({ path: "./config.env.dev" });
        done();
    }
    catch (_err) {
        console.log(_err);
        done();
    }

});

/**
 * Summary: uncaughtException
 * @description Test uncaughtException process.
 */
// unit tests for env file
describe("env", () => {
    it("should have a client id", () => {
        expect(process.env.API_NAME).be.not.NaN;
    });

    it("should have a client secret", () => {
        expect(process.env.API_PORT).be.not.NaN;
    });
    it("should have a host", () => {
        expect(process.env.ENVIRONMENT).be.not.NaN;
    });
    it("should have a scope", () => {
        expect(process.env.SESSION_SECRET).be.not.NaN;
    });
    it("should have a response type", () => {
        expect(process.env.MONGO_URI).be.not.NaN;
    });
    it("should have a redirect uri", () => {
        expect(process.env.MONGO_USERNAME).be.not.NaN;
    });

});


/**
 * Summary: afterEach
 * @description afterEach restore sinon
 */
afterEach((done) => {
    done();
});