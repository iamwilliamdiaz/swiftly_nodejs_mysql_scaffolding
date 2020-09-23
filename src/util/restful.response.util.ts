import { Response } from "express";
import logger from "../util/logger.util";
export default function toJSON(_res: Response, _serviceResponse: any) {
  return _res.status(_serviceResponse.statusCode || 500).json({
    "success": true,
    "statusCode": _serviceResponse.statusCode || 500,
    "result": _serviceResponse.data || [],
    "message": "Ok",
    "total": (_serviceResponse.data && Object.keys(_serviceResponse.data).length)
  });
}

/** In case want to support XML in the future */
// @ts-ignore
/* istanbul ignore next */
export function toXML(_res: Response, _serviceResponse: string) {
  return _res.status(_res.statusCode);
}
/** In case want to support MRSS in the future */
// @ts-ignore
/* istanbul ignore next */
export function toMRSS(_res: Response, _serviceResponse: string) {
  return _res.status(_res.statusCode);
}
/** In case want to support SOAP in the future */
// @ts-ignore
/* istanbul ignore next */
export function toSOAP(_res: Response, _serviceResponse: string) {
  return _res.status(_res.statusCode);
}

/**
 *
 *
 * @export
 * @param {Response} _res
 * @param {ErrorEvent} _payload
 * @returns
 */
export function errorHandler(_res: Response, _error: any) {
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
  logger.error(_errBody);
  return _res.status(_error.statusCode).json(_errBody);
}
