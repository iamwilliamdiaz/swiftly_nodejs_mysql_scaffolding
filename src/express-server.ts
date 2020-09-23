import { ENVIRONMENT } from "./util/secrets.util";
import { Express } from "express";
import { IndexRoutesLoader } from "./routes/index.routes.loader";
import { Server } from "http";

import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import lusca from "lusca";
import expressValidator from "express-validator";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import StatusMonitor from "./middlewares/status.monitor.middleware";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import cors from "cors";
import YAML from "yamljs";

const MongoDBStore = require("connect-mongodb-session")(session);
const schema = YAML.load("./definitions/swagger-sample.yaml");

export class ExpressServer {
    private httpServer?: Server;
    /**
     * Setup middlewares and handlers
     * @param {number} port
     * @returns
     *
     * @memberOf ExpressServer
     */
    public setup(port?: number) {
        const server: Express = express();
        this.setupHeaders(server);
        this.setupSessions(server);
        this.setupStandardMiddlewares(server);
        this.setupSecurityMiddlewares(server);
        this.setupServiceDependencies(server);
        this.setupTelemetry(server);
        this.setupStatus(server);
        this.setupCrudHandlers(server);
        this.httpServer = this.listen(server, port);
        return server;
    }
    public listen(server: Express, port: number) {
        console.log(ENVIRONMENT);
        console.log("************************************************************************");
        console.log("**                          Microservice Instance                     **");
        console.log("               App is running at http://localhost:%d in %s mode", port, ENVIRONMENT);
        console.log("**                                                                    **");
        console.log("************************************************************************");
        if (ENVIRONMENT === "dev" || ENVIRONMENT === "test" ) {
            console.log("************************************************************************");
            console.log("**                            SWAGGER EXPLORER                        **");
            console.log("**    To access swagger explorer use http://localhost:%d/explorer   **", port);
            console.log("************************************************************************");
        }
        return server.listen(port);
    }

    public kill() {
        if (this.httpServer) { this.httpServer.close(); }
    }

    private setupHeaders(server: Express) {
        server.use((req: express.Request, res: express.Response, next) => {
            res.header("x-powered-by", "WILLIAMDIAZ");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, X-Session-Token, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
            return next();
        });
    }

    private setupSecurityMiddlewares(server: Express) {
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        });
        server.use(limiter);
        server.options("*", cors());
        server.use(express.json({ limit: "10kb" }));
        server.use(lusca.xframe("SAMEORIGIN"));
        server.use(lusca.xssProtection(true));
        server.use(mongoSanitize());
    }

    private setupStandardMiddlewares(server: Express) {
        server.set("etag", "strong");
        server.use(bodyParser.json());
        server.use(compression());
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ "extended": true }));
        server.use(expressValidator(), (req: express.Request, res: express.Response, next: express.NextFunction) => {
            next();
        });

        if (ENVIRONMENT === "dev" || ENVIRONMENT === "test") {
            server.use("/explorer", swaggerUi.serveWithOptions({ "cacheControl": false, "dotfiles": "deny" }), swaggerUi.setup(schema));
        }
    }
    private setupSessions(server: Express) {

    }
    private setupTelemetry(server: Express) {
        // ElasticAPM
    }

    private setupStatus(server: Express) {
        StatusMonitor.mount(server);
    }

    private setupCrudHandlers(server: Express) {
        server.use("/version", (req: express.Request, res: express.Response) => {
            res.status(200).json({
                "version": "1.0.2",
                "message": "Example Microservice",
                "deployed-date": "08/25/2020",
            });
        });
        server.all("/*?", (req: express.Request, res: express.Response) => {
            res.status(403).json({
                "status": 403,
                "code": 403,
                "message": "Please provide a CURL resource for the API.",
                "developerMessage": "Verify the existence of the CRUD resource.",
            });
        });
    }

    private setupServiceDependencies(server: Express) {
        const servicesMiddleware = new IndexRoutesLoader();
        servicesMiddleware.init(server);
    }

}

