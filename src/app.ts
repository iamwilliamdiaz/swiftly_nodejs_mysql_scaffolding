import { ExpressServer } from "./express-server";
import { API_PORT } from "./util/secrets.util";
export class Application {
    public static createApplication() {
        const expressServer = new ExpressServer();
        const serverPort: any = API_PORT;
        expressServer.setup(serverPort);
        this.handleExit(expressServer);
        return expressServer;
    }
    private static handleExit(express: ExpressServer) {
        process.on("uncaughtException", (err: Error) => {
            console.error("Uncaught exception", err);
            Application.shutdownProperly(1, express);
        });
        process.on("unhandledRejection", (reason: {} | null | undefined) => {
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

    private static shutdownProperly(exitCode: number, express: ExpressServer) {
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


