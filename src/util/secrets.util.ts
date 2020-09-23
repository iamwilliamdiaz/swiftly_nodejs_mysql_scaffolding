import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  dotenv.config({ "path": ".env" });
} else {
  dotenv.config({ "path": ".env.dev" });
}

/***
 * Why checkENV? Branching coverage in integration and unit testing
 */

export const { API_NAME } = process.env;
(checkENV(API_NAME));

export const { API_PORT } = process.env;
(checkENV(API_PORT));

export const ENVIRONMENT = process.env.NODE_ENV;
(checkENV(ENVIRONMENT));

export const { SESSION_SECRET } = process.env;
(checkENV(SESSION_SECRET));

export const { MONGO_USERNAME } = process.env;
(checkENV(MONGO_USERNAME));

export const { MONGO_PASSWORD } = process.env;
(checkENV(MONGO_PASSWORD));

export const { MONGO_URI } = process.env;
(checkENV(MONGO_URI));

export const { MYSQL_USERNAME } = process.env;
(checkENV(MYSQL_USERNAME));

export const { MYSQL_PASSWORD } = process.env;
(checkENV(MYSQL_PASSWORD));

export const { MYSQL_CONNECTION_STRING } = process.env;
(checkENV(MYSQL_CONNECTION_STRING));

export const { ENABLE_TOKENIZATION } = process.env;
(checkENV(ENABLE_TOKENIZATION));

export const { ENABLE_TOKENIZATION_SECRET } = process.env;
(checkENV(ENABLE_TOKENIZATION_SECRET));

export const { LOGLEVEL } = process.env;
(checkENV(LOGLEVEL));

/* istanbul ignore next */
function checkENV(_envVar: string) {
  if (!_envVar) {
    throw new Error(`Problems to read the ${_envVar} in the .env file`);
  }
}
