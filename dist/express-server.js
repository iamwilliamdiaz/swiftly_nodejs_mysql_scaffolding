"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_util_1 = require("./util/secrets.util");
const index_routes_loader_1 = require("./routes/index.routes.loader");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_session_1 = __importDefault(require("express-session"));
const lusca_1 = __importDefault(require("lusca"));
const express_validator_1 = __importDefault(require("express-validator"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const status_monitor_middleware_1 = __importDefault(require("./middlewares/status.monitor.middleware"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const yamljs_1 = __importDefault(require("yamljs"));
const MongoDBStore = require("connect-mongodb-session")(express_session_1.default);
const schema = yamljs_1.default.load("./definitions/swagger-sample.yaml");
class ExpressServer {
    /**
     * Setup middlewares and handlers
     * @param {number} port
     * @returns
     *
     * @memberOf ExpressServer
     */
    setup(port) {
        const server = express_1.default();
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
    listen(server, port) {
        console.log(secrets_util_1.ENVIRONMENT);
        console.log("************************************************************************");
        console.log("**                          Microservice Instance                     **");
        console.log("               App is running at http://localhost:%d in %s mode", port, secrets_util_1.ENVIRONMENT);
        console.log("**                                                                    **");
        console.log("************************************************************************");
        if (secrets_util_1.ENVIRONMENT === "dev" || secrets_util_1.ENVIRONMENT === "test") {
            console.log("************************************************************************");
            console.log("**                            SWAGGER EXPLORER                        **");
            console.log("**    To access swagger explorer use http://localhost:%d/explorer   **", port);
            console.log("************************************************************************");
        }
        return server.listen(port);
    }
    kill() {
        if (this.httpServer) {
            this.httpServer.close();
        }
    }
    setupHeaders(server) {
        server.use((req, res, next) => {
            res.header("x-powered-by", "WILLIAMDIAZ");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, X-Session-Token, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
            return next();
        });
    }
    setupSecurityMiddlewares(server) {
        const limiter = express_rate_limit_1.default({
            windowMs: 15 * 60 * 1000,
            max: 100 // limit each IP to 100 requests per windowMs
        });
        server.use(limiter);
        server.options("*", cors_1.default());
        server.use(express_1.default.json({ limit: "10kb" }));
        server.use(lusca_1.default.xframe("SAMEORIGIN"));
        server.use(lusca_1.default.xssProtection(true));
        server.use(express_mongo_sanitize_1.default());
    }
    setupStandardMiddlewares(server) {
        server.set("etag", "strong");
        server.use(body_parser_1.default.json());
        server.use(compression_1.default());
        server.use(body_parser_1.default.json());
        server.use(body_parser_1.default.urlencoded({ "extended": true }));
        server.use(express_validator_1.default(), (req, res, next) => {
            next();
        });
        if (secrets_util_1.ENVIRONMENT === "dev" || secrets_util_1.ENVIRONMENT === "test") {
            server.use("/explorer", swagger_ui_express_1.default.serveWithOptions({ "cacheControl": false, "dotfiles": "deny" }), swagger_ui_express_1.default.setup(schema));
        }
    }
    setupSessions(server) {
    }
    setupTelemetry(server) {
        // ElasticAPM
    }
    setupStatus(server) {
        status_monitor_middleware_1.default.mount(server);
    }
    setupCrudHandlers(server) {
        server.use("/version", (req, res) => {
            res.status(200).json({
                "version": "1.0.2",
                "message": "Example Microservice",
                "deployed-date": "08/25/2020",
            });
        });
        server.all("/*?", (req, res) => {
            res.status(403).json({
                "status": 403,
                "code": 403,
                "message": "Please provide a CURL resource for the API.",
                "developerMessage": "Verify the existence of the CRUD resource.",
            });
        });
    }
    setupServiceDependencies(server) {
        const servicesMiddleware = new index_routes_loader_1.IndexRoutesLoader();
        servicesMiddleware.init(server);
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=express-server.js.map