
import app from "../../../index";
import request from "supertest";
import { assert } from "chai";

let server: any;
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
     */

    server = app.setup();
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
describe("Positive check for api version information - Success", () => {
  it("should return 200", async (done) => {
    await request(server).get(`/version`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        assert.isNotEmpty(response.body);
        done();
      });
  });
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
  it("should return 403", async (done) => {
    await request(server).get(`/wrong-url`)
      .expect("Content-Type", /json/)
      .expect(403)
      .then(response => {
        assert.isNotEmpty(response.body);
        done();
      });
  });
});


afterAll(async (done) => {
  done();
});
