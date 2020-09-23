
import { generateToken } from "../../helpers/token.generator.test.helper";
import app from "../../../index";
import request from "supertest";
import { assert } from "chai";

let server: any;
let token: any;

const account: any = {
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
beforeAll(async (done) => {
  try {

    /**
     * Summary: Instantiate express app server
     * @description
     * @beta
     */

    token = generateToken("integration", 36000);
    server = app.setup();

    /**
     * Summary: post request to create a new account
     * @description
     * @beta
     */

    const response = await request(server).post("/accounts")
      .send({ firstname: "Joe", lastname: "Doe" })
      .set({ "x-session-token": token, "Accept": "application/json" })
      .expect("Content-Type", /json/)
      .expect(200);

    assert.isNotEmpty(response.body.result);
    assert.isArray(response.body.result);

    account.user_id = (response && response.body && response.body.result && response.body.result[0].user_id) ? response.body.result[0].user_id : 0;

    done();
  }
  catch (_err) {
    console.log(_err);
    done();
  }

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

describe("Get Accounts Details - 200 Integration", () => {
  it("should return 200", async (done) => {
    await request(server).get(`/accounts/${account.user_id}`)
      .set({ "x-session-token": token, "Accept": "application/json" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert.isNotEmpty(response.body.result);
        assert.isArray(response.body.result);
        assert.strictEqual(response.body.result[0].user_id, account.user_id);
        done();
      });
  });
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
  it("should return 204", async (done) => {
    await request(server).put(`/accounts/${account.user_id}`)
      .set({ "x-session-token": token, "Accept": "application/json" })
      .send({ "firstname": "John", "lastname": "Doe" });
    done();
  });
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
  it("should return 200", async (done) => {
    await request(server).get(`/accounts/search/${_criteria}`)
      .set({ "x-session-token": token, "Accept": "application/json" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert.isNotEmpty(response.body.result);
        assert.isArray(response.body.result);
        done();
      });
  });
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
  it("should return 503 error", async (done) => {
    await request(server).get(`/accounts/search/${_criteria}`)
      .set({ "x-session-token": token, "Accept": "application/json" })
      .query({ "limit": "1", "sort": "_error" })
      .expect("Content-Type", /json/)
      .expect(503)
      .then(response => {
        assert.isNotEmpty(response.body);
        done();
      });
  });
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
  it("should return 403", async (done) => {
    await request(server).get(`/accounts/${account.user_id}`)
      .set({ "x-session-token": "0000000000000", "Accept": "application/json" })
      .expect("Content-Type", /json/)
      .expect(401)
      .then(response => {
        assert.isNotEmpty(response.body.result);
        assert.isObject(response.body.result);
        done();
      });
  });
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
  it("should return 403", async (done) => {
    await request(server).get(`/accounts/${account.user_id}`)
      .set({ "x-session-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwIiwibmFtZSI6IjIwMjAtMDgtMjdUMjM6NDk6MDAuNjAzWiIsImlhdCI6MTU5ODU3MjE0MCwiZXhwIjoxNTk4NTcyNTAwfQ.h6EsV0gFC_jtxsQ13_j5cRfEAYJyxBti-sAeZ-7BB18", "Accept": "application/json" })
      .expect("Content-Type", /json/)
      .expect(403)
      .then(response => {
        assert.isNotEmpty(response.body.result);
        assert.isObject(response.body.result);
        done();
      });
  });
});


afterAll(async (done) => {
  if (server) {
    await request(server).delete(`/accounts/${account.user_id}`)
      .set({ "x-session-token": token, "Accept": "application/json" })
      .expect(204);
    done();
    app.kill();
  }
});
