"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addServicesToRequest = (services) => (req, res, next) => {
    req.services = services;
    next();
};
//# sourceMappingURL=service.dependencies.middleware.js.map