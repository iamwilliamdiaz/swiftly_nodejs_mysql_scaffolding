import { Application, RequestHandler } from "express";
import { AccountsRoutes } from "./accounts.routes";
/**
 * Instantiate class with all ExpressJs routes
 * @export
 * @class IndexRoutesLoader
 */
export class IndexRoutesLoader {
  /**
   * Public method to initialize the routes
   *
   * @param {Application} app
   * @memberOf IndexRoutesLoader
   */
  public init(app: Application): void {
    AccountsRoutes(app);
  }

}
