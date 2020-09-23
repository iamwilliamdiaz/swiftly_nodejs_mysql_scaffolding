import * as Accounts from "../../../core/accounts/accounts.controllers";
import * as expressValidator from "../../helpers/express.validator.test.helper";
import { generateToken } from "../../helpers/token.generator.test.helper";
import httpMocks from "node-mocks-http";
import { expect } from "chai";


let token: any;
let mockAccountsReq;

/**
 * Summary:
 * @description
 * @method beforeAll
 * @returns index.ts
 *
 * @beta
 */
beforeAll(async (done) => {
    try {
        token = generateToken("integration", 36000);
        done();
    }
    catch (_err) {
        done();
    }
});
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
    it("should return 200 OK", async (done) => {
        mockAccountsReq = httpMocks.createRequest({
            method: "GET",
            url: "/account/12345",
            params: {
                user_id: 12345
            }
        });

        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);

        try {
            const _result: any = await Accounts.getAccountById(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(200);
        }
        catch (_err) {
            expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
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
    it("should return 422 code", async (done) => {
        mockAccountsReq = httpMocks.createRequest({
            method: "GET",
            url: "/account/"
        });

        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["user_id"]);

        try {
            const _result: any = await Accounts.getAccountById(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(422);
        }
        catch (_err) {
            expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
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
    it("should return 200 OK", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);

        try {
            const _result: any = await Accounts.createAccounts(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(200);
        }
        catch (_err) {
            expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
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
    it("should return 422 code", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["firstname", "lastname"]);

        try {
            const _result: any = await Accounts.createAccounts(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(422);

        }
        catch (_err) {
            expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
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
    it("should return 204 OK", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);

        try {
            const _result: any = await Accounts.updateAccountById(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(204);
        }
        catch (_err) {
             expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
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
    it("should return 422 code", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["firstname", "lastname"]);

        try {
            const _result: any = await Accounts.updateAccountById(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(422);

        }
        catch (_err) {
            expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
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
    it("should return 204 OK", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.body = {
            firstname: "John",
            lastanem: "Doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);
        try {
            const _result: any = await Accounts.deleteAccountById(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(204);
        }
        catch (_err) {
             expect(_err.statusCode).to.be.equals(500);
        }
        done();
    });
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
    it("should return 422 code", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["firstname", "lastname"]);

        try {
            const _result: any = await Accounts.deleteAccountById(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(422);

        }
        catch (_err) {
            expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
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
    it("should return 204 OK", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.body = {
            criteria: "doe"
        };
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getValidInputRequest(mockAccountsReq);
        try {
            const _result: any = await Accounts.searchAccountByCriteria(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(200);
        }
        catch (_err) {
             expect(_err.statusCode).to.be.equals(500);
        }
        done();
    });
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
    it("should return 422 code", async (done) => {
        mockAccountsReq = httpMocks.createRequest();
        mockAccountsReq.headers["x-session-token"] = token;
        mockAccountsReq = expressValidator.getInvalidInputRequest(mockAccountsReq, ["doe"]);

        try {
            const _result: any = await Accounts.searchAccountByCriteria(mockAccountsReq);
            expect(_result.statusCode).to.be.equals(422);

        }
        catch (_err) {
            expect(_err.statusCode).to.be.equals(500);
        }

        done();

    });
});




