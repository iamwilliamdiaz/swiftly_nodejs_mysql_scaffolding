"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app = app_1.Application.createApplication();
const memory = process.memoryUsage();
const memoryData = [
    { Type: "Rss", "Memory Size": `${Math.round((memory["rss"]) * 1e-6)} MB` },
    { Type: "Heap Total", "Memory Size": `${Math.round((memory["heapTotal"]) * 1e-6)} MB` },
    { Type: "Heap Used", "Memory Size": `${Math.round((memory["heapUsed"]) * 1e-6)} MB` },
    { Type: "External", "Memory Size": `${Math.round((memory["external"]) * 1e-6)} MB` },
];
console.table(memoryData);
exports.default = app;
//# sourceMappingURL=index.js.map