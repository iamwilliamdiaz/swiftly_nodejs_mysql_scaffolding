"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_routes_1 = require("./accounts.routes");
/**
 * Instantiate class with all ExpressJs routes
 * @export
 * @class IndexRoutesLoader
 */
class IndexRoutesLoader {
    /**
     * Public method to initialize the routes
     *
     * @param {Application} app
     * @memberOf IndexRoutesLoader
     */
    init(app) {
        accounts_routes_1.AccountsRoutes(app);
    }
}
exports.IndexRoutesLoader = IndexRoutesLoader;
//# sourceMappingURL=index.routes.loader.js.map