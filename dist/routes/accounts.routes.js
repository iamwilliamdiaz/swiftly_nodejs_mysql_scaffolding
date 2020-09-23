"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountsController = __importStar(require("../core/accounts/accounts.controllers"));
const apiResponse = __importStar(require("../util/restful.response.util"));
const auth_middleware_1 = require("./../middlewares/auth.middleware");
/**
 *
 * @function AccountsRoutes
 * @export
 * @param {*} app
 */
function AccountsRoutes(app) {
    /** Get account by Id */
    app.get("/accounts/:user_id", [auth_middleware_1.isAuthenticated], (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const _result = yield accountsController.getAccountById(req);
            apiResponse.default(res, _result);
        }
        catch (_err) {
            apiResponse.errorHandler(res, _err);
        }
    }));
    /** Search account by criteria */
    app.get("/accounts/search/:criteria", [auth_middleware_1.isAuthenticated], (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const _result = yield accountsController.searchAccountByCriteria(req);
            apiResponse.default(res, _result);
        }
        catch (_err) {
            apiResponse.errorHandler(res, _err);
        }
    }));
    /** Create account */
    app.get("/accounts", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const _result = yield accountsController.getAllAccounts(req);
            apiResponse.default(res, _result);
        }
        catch (_err) {
            apiResponse.errorHandler(res, _err);
        }
    }));
    /** Create account */
    app.post("/accounts", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const _result = yield accountsController.createAccounts(req);
            apiResponse.default(res, _result);
        }
        catch (_err) {
            apiResponse.errorHandler(res, _err);
        }
    }));
    /** Create account */
    app.put("/accounts/:user_id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const _result = yield accountsController.updateAccountById(req);
            apiResponse.default(res, _result);
        }
        catch (_err) {
            apiResponse.errorHandler(res, _err);
        }
    }));
    /** Create account */
    app.delete("/accounts/:user_id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const _result = yield accountsController.deleteAccountById(req);
            apiResponse.default(res, _result);
        }
        catch (_err) {
            apiResponse.errorHandler(res, _err);
        }
    }));
}
exports.AccountsRoutes = AccountsRoutes;
//# sourceMappingURL=accounts.routes.js.map