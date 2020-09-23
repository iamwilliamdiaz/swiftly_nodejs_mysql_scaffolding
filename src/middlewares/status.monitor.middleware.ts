/**
 * Define & configure your status monitor
 *
 */

import { Application } from "express";
import expressStatusMonitor from "express-status-monitor";

class StatusMonitor {
    public mount(_express: Application): Application {

        const api: string = "explorer";

        // Define your status monitor config
        const monitorOptions: object = {
            title: "PlayVue",
            path: "/status-monitor",
            spans: [
                {
                    interval: 1, 		// Every second
                    retention: 60		// Keep 60 data-points in memory
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
        _express.use(expressStatusMonitor(monitorOptions));
        return _express;
    }
}

export default new StatusMonitor;