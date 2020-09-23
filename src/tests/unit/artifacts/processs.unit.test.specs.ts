import app from "../../../index";
import sinon from "sinon";

const sandbox = sinon.createSandbox();
let server: any;

/**
 * Summary: beforeAll
 * @description Initiliaze the express server
 */
beforeAll(async (done) => {

    try {
        server = app.setup();
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
describe("Test uncaughtException", () => {
    it("should return error", async (done) => {

        const spy = sinon.spy();
        process.on("uncaughtException", spy);
        process.emit("uncaughtException", new Error("forced error"));
        sinon.assert.calledOnce(spy);
        done();

    });
});


/**
 * Summary: unhandledRejection
 * @description Test unhandledRejection process.
 */
describe("Test unhandledRejection", () => {
    it("should return error", async (done) => {

        const spy = sinon.spy();
        process.on("unhandledRejection", spy);
        process.emit("unhandledRejection", "reason", new Promise(() => { }));
        sinon.assert.calledOnce(spy);

        done();

    });
});

/**
 * Summary: SIGINT
 * @description Test SIGINT process.
 */
describe("Test SIGINT", () => {
    it("should return error", async (done) => {

        const spy = sinon.spy();
        process.on("SIGINT", spy);
        process.emit("SIGINT");
        sinon.assert.calledOnce(spy);

        done();

    });
});


/**
 * Summary: SIGTERM
 * @description Test SIGTERM process.
 */
describe("Test SIGTERM", () => {
    it("should return error", async (done) => {

        const spy = sinon.spy();

        process.on("SIGTERM", spy);
        process.emit("SIGTERM");
        sinon.assert.calledOnce(spy);

        done();

    });
});

/**
 * Summary: afterEach
 * @description afterEach restore sinon
 */
afterEach(() => {
    sinon.restore();
});