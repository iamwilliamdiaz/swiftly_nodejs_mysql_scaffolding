"use strict";
/**
 * Define & configure your status monitor
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_status_monitor_1 = __importDefault(require("express-status-monitor"));
class StatusMonitor {
    mount(_express) {
        const api = "explorer";
        // Define your status monitor config
        const monitorOptions = {
            title: "PlayVue",
            path: "/status-monitor",
            spans: [
                {
                    interval: 1,
                    retention: 60 // Keep 60 data-points in memory
                },
                {
                    interval: 5,
                    retention: 60
                },
                {
                    interval: 15,
                    retention: 60
                }
            ],
            chartVisibility: {
                mem: true,
                rps: true,
                cpu: true,
                load: true,
                statusCodes: true,
                responseTime: true
            },
            healthChecks: [{
                    protocol: "http",
                    host: "localhost",
                    path: "/explorer/",
                    port: "3001"
                }]
        };
        // Loads the express status monitor middleware
        _express.use(express_status_monitor_1.default(monitorOptions));
        return _express;
    }
}
exports.default = new StatusMonitor;
//# sourceMappingURL=status.monitor.middleware.js.map