"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let statusCode = "";
let statusMessage = "";
/**
 *
 * @export
 * @param {string} _statuscode
 * @param {*} _res
 * @param {*} _result
 * @returns
 */
function httpResponse(_statuscode, _res, _result) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (_statuscode) {
            case "200":
                _res = yield setStatus(_res, "200", "Ok");
                return _result;
            case "202":
                _res = yield setStatus(_res, "202", "Forbidden - The server understood the request but refuses to authorize it.");
                return _result;
            case "204":
                _res = yield setStatus(_res, "204", "No Content - The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.");
                return _result;
            case "304":
                _res = yield setStatus(_res, "304", "Forbidden - The server understood the request but refuses to authorize it.");
                return _result;
            case "404":
                _res = yield setStatus(_res, "404", "Not found - The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.");
                return _result;
            default:
                _res = yield setStatus(_res, "201", "Forbidden - The server understood the request but refuses to authorize it.");
                return _result;
        }
    });
}
exports.httpResponse = httpResponse;
function httpErrorResponse(_statuscode, _res, _error) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (_statuscode) {
            case "400":
                _res = yield setErrorStatus(_res, "400", "Bad Request - The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).");
                return _error;
            case "401":
                _res = yield setErrorStatus(_res, "401", "Unauthorized  - Unauthorized client error status response code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.");
                return _error;
            case "402":
                _res = yield setErrorStatus(_res, "402", "Payment Required -  The server request can not be processed until the client makes a payment");
                return _error;
            case "403":
                _res = yield setErrorStatus(_res, "403", "Forbidden - The server understood the request but refuses to authorize it.");
                return _error;
            case "404":
                _res = yield setErrorStatus(_res, "404", "Not found - The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.");
                return _error;
            case "409":
                _res = yield setErrorStatus(_res, "409", "Conflict - The request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request.");
                return _error;
            case "422":
                _res = yield setErrorStatus(_res, "422", "Unprocessable Entity - The server understands the content type of the request entity.");
                return _error;
            default:
                _res = yield setErrorStatus(_res, "500", "Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request.");
                return _error;
        }
    });
}
exports.httpErrorResponse = httpErrorResponse;
/**
 * Set the response http status
 * @param {*} _res
 * @param {*} _statuscode
 * @param {*} _message
 * @returns
 */
function setStatus(_res, _statuscode, _message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            _res.statusCode = _statuscode || statusCode || "422";
            _res.statusMessage = _message || statusMessage || "ok";
            /**
             * After setting the response, keep in memory the last status set.
             */
            statusCode = _statuscode;
            statusMessage = _message;
            return _res;
        }
        catch (_error) {
            return new Error(_error);
        }
    });
}
/**
 * Set the response http status
 * @param {*} _res
 * @param {*} _statuscode
 * @param {*} _message
 * @returns
 */
function setErrorStatus(_res, _statuscode, _message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            _res.statusCode = _statuscode || statusCode;
            _res.statusMessage = _message || statusMessage || "ok";
            /**
             * After setting the response, keep in memory the last status set.
             */
            statusCode = _statuscode;
            statusMessage = _message;
            return _res;
        }
        catch (_error) {
            return new Error(_error);
        }
    });
}
//# sourceMappingURL=http.requests.handler.util.js.map