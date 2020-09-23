import { mySQLDBConnector } from "./mysql.connector";
import logger from "../util/logger.util";
export namespace mySQLDBService {
  /**
   *
   * @function executeSelectQuery
   * @export
   * @param {object} _query
   * @param {number} _binds
   * @param {Object} _options
   * @returns
   */
  export async function executeQuery(_query: any) {
    return new Promise(async (resolve, reject) => {
      let mySQLConnection;
      try {
        /** Get a connection from the default pool */
        mySQLConnection = await mySQLDBConnector.getPoolConnection();
        await mySQLConnection.query(_query, function (_err: any, _result: any, fields?: any) {
          if (_err) {
            reject(_err);
          }
          return resolve(_result);
        });
      } catch (_err) {
        /** Reject the request in case of connection issues */
        reject(_err);
      } finally {
        if (mySQLConnection) {
          try {
            /** Put the connection back in the pool */
            await mySQLConnection.release();
          } catch (_err) {
            logger.error(_err);
            return new Error(_err);
          }
        }
      }
    });
  }
  /**
   *
   * @function executeSelectQuery
   * @export
   * @param {object} _query
   * @param {number} _binds
   * @param {Object} _options
   * @returns
   *
   * Please note that beginTransaction(), commit() and rollback() are simply convenience functions
   * that execute the START TRANSACTION, COMMIT, and ROLLBACK commands respectively. It is
   * important to understand that many commands in MySQL can cause an implicit commit,
   * as described in the MySQL documentation
   *
   */
  export async function executeTransactionalQuery(_query: any) {
    return new Promise(async (resolve, reject) => {
      let mySQLConnection: any;
      try {
        /** Get pool connection */
        mySQLConnection = await mySQLDBConnector.getPoolConnection();
        /** Get the connection from the pool  */
        mySQLConnection.getConnection((_err: any, _connection: any) => {
          if (_err) {
            return reject(_err);
          }
          /** Start a new transaction.  */
          _connection.beginTransaction((_err: any) => {
            if (_err) {
              return reject(_err);
            }
            /** Query the database  */
            _connection.query(_query, (error: any, _result: any, fields: any) => {
              if (error) {
                /** Cancel the existing transaction.  */
                return _connection.rollback(() => {
                  return reject(error);
                });
              }
              /** Make the changes permanents.  */
              _connection.commit((err: any) => {
                if (err) {
                  return _connection.rollback(function () {
                    throw err;
                  });
                }
                return resolve(_result);
              });

            });
          });
        });

      } catch (_err) {
        /** Reject the request in case of connection issues */
        reject(_err);
      } finally {
        if (mySQLConnection) {
          try {
            /** Put the connection back in the pool */
            await mySQLConnection.release();
          } catch (_err) {
            logger.error(_err);
            return new Error(_err);
          }
        }
      }
    });
  }
}
