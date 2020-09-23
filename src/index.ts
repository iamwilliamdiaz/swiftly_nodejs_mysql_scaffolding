import { Application } from "./app";
const app = Application.createApplication();
const memory = process.memoryUsage();

const memoryData = [
    { Type: "Rss", "Memory Size": `${Math.round((memory["rss"]) * 1e-6)} MB` },
    { Type: "Heap Total", "Memory Size": `${Math.round((memory["heapTotal"]) * 1e-6)} MB` },
    { Type: "Heap Used", "Memory Size": `${Math.round((memory["heapUsed"]) * 1e-6)} MB` },
    { Type: "External", "Memory Size": `${Math.round((memory["external"]) * 1e-6)} MB` },
];

console.table(memoryData);
export default app;