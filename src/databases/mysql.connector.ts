import { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_CONNECTION_STRING } from "../util/secrets.util";
import mySQL from "mysql";
import logger from "../util/logger.util";

let dbConnection: any;

export namespace mySQLDBConnector {
  /**
   *
   * @function getPoolConnection
   * @export
   * @returns dbConnection
   */
  export async function getPoolConnection() {
    if (!dbConnection) {
      dbConnection = await setPoolConnection().then((myConnectionPool: any) => {
        return myConnectionPool;
      });
    }
    return dbConnection;
  }

  async function setPoolConnection() {
    try {
      return mySQL.createPool({
        connectionLimit: 10,
        host: MYSQL_CONNECTION_STRING,
        user: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
      });
    } catch (_err) {
      logger.error(_err);
      return new Error(_err);
    } finally {
      await closePool();
    }
  }

  async function closePool() {
    try {
      await dbConnection && dbConnection.destroy();
    } catch (_err) {
      logger.error(_err);
    }
  }
}
