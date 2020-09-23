import { ENVIRONMENT, LOGLEVEL } from "./secrets.util";
import winston from "winston";


const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize({ all: true }),
            winston.format.align(),

          ),
        }),
      ]
});

const envTransports = {};
/**
 * Assign the new level of logging
 */
Object.assign(envTransports, { "consoleOptions": { "level": LOGLEVEL } });

/**
 * New Logger Instance
 */
if (ENVIRONMENT !== "prod") {
    logger.debug("Logging initialized at debug level");
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;

