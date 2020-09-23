"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_1 = __importDefault(require("../util/logger.util"));
function toJSON(_res, _serviceResponse) {
    return _res.status(_serviceResponse.statusCode || 500).json({
        "success": true,
        "statusCode": _serviceResponse.statusCode || 500,
        "result": _serviceResponse.data || [],
        "message": "Ok",
        "total": (_serviceResponse.data && Object.keys(_serviceResponse.data).length)
    });
}
exports.default = toJSON;
/** In case want to support XML in the future */
// @ts-ignore
/* istanbul ignore next */
function toXML(_res, _serviceResponse) {
    return _res.status(_res.statusCode);
}
exports.toXML = toXML;
/** In case want to support MRSS in the future */
// @ts-ignore
/* istanbul ignore next */
function toMRSS(_res, _serviceResponse) {
    return _res.status(_res.statusCode);
}
exports.toMRSS = toMRSS;
/** In case want to support SOAP in the future */
// @ts-ignore
/* istanbul ignore next */
function toSOAP(_res, _serviceResponse) {
    return _res.status(_res.statusCode);
}
exports.toSOAP = toSOAP;
/**
 *
 *
 * @export
 * @param {Response} _res
 * @param {ErrorEvent} _payload
 * @returns
 */
function errorHandler(_res, _error) {
    /**
     * Set content type to problem json
     */
    _res.contentType("application/problem+json");
    const _errCode = (_error) ? _error.statusCode : 500;
    const _errBody = {
        "success": false,
        "statusCode": _errCode,
        "result": _error.data || [],
        "message": _error.message
    };
    logger_util_1.default.error(_errBody);
    return _res.status(_error.statusCode).json(_errBody);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=restful.response.util.js.map