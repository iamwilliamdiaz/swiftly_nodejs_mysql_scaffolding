"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_server_1 = require("./express-server");
const secrets_util_1 = require("./util/secrets.util");
class Application {
    static createApplication() {
        const expressServer = new express_server_1.ExpressServer();
        const serverPort = secrets_util_1.API_PORT;
        expressServer.setup(serverPort);
        this.handleExit(expressServer);
        return expressServer;
    }
    static handleExit(express) {
        process.on("uncaughtException", (err) => {
            console.error("Uncaught exception", err);
            Application.shutdownProperly(1, express);
        });
        process.on("unhandledRejection", (reason) => {
            console.error("Unhandled Rejection at promise", reason);
            Application.shutdownProperly(2, express);
        });
        process.on("SIGINT", () => {
            console.info("Caught SIGINT");
            Application.shutdownProperly(128 + 2, express);
        });
        process.on("SIGTERM", () => {
            console.info("Caught SIGTERM");
            Application.shutdownProperly(128 + 2, express);
        });
    }
    static shutdownProperly(exitCode, express) {
        Promise.resolve()
            .then(() => express.kill())
            .then(() => {
            console.info("Shutdown complete");
            process.exitCode = exitCode;
        })
            .catch((err) => {
            console.error("Error during shutdown", err);
            process.exitCode = 1;
        });
    }
}
exports.Application = Application;
//# sourceMappingURL=app.js.map