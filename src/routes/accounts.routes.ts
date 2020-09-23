import { Application, Response, Request } from "express";
import * as accountsController from "../core/accounts/accounts.controllers";
import * as apiResponse from "../util/restful.response.util";
import { isAuthenticated } from "./../middlewares/auth.middleware";
/**
 *
 * @function AccountsRoutes
 * @export
 * @param {*} app
 */
export function AccountsRoutes(app: Application): void {

  /** Get account by Id */
  app.get("/accounts/:user_id", [isAuthenticated], async (req: Request, res: Response) => {
    try {
      const _result = await accountsController.getAccountById(req);
      apiResponse.default(res, _result);
    }
    catch (_err) {
      apiResponse.errorHandler(res, _err);
    }
  });
  /** Search account by criteria */
  app.get("/accounts/search/:criteria", [isAuthenticated], async (req: Request, res: Response) => {
    try {
      const _result = await accountsController.searchAccountByCriteria(req);
      apiResponse.default(res, _result);
    }
    catch (_err) {
      apiResponse.errorHandler(res, _err);
    }
  });

  /** Create account */
  app.get("/accounts", async (req: Request, res: Response) => {
    try {
      const _result = await accountsController.getAllAccounts(req);
      apiResponse.default(res, _result);
    }
    catch (_err) {
      apiResponse.errorHandler(res, _err);
    }
  });

  /** Create account */
  app.post("/accounts", async (req: Request, res: Response) => {
    try {
      const _result = await accountsController.createAccounts(req);
      apiResponse.default(res, _result);
    }
    catch (_err) {
      apiResponse.errorHandler(res, _err);
    }
  });
  /** Create account */
  app.put("/accounts/:user_id", async (req: Request, res: Response) => {
    try {
      const _result = await accountsController.updateAccountById(req);
      apiResponse.default(res, _result);
    }
    catch (_err) {
      apiResponse.errorHandler(res, _err);
    }
  });
  /** Create account */
  app.delete("/accounts/:user_id", async (req: Request, res: Response) => {
    try {
      const _result = await accountsController.deleteAccountById(req);
      apiResponse.default(res, _result);
    }
    catch (_err) {
      apiResponse.errorHandler(res, _err);
    }
  });


}
