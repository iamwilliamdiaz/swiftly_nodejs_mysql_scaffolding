/**
 * Auth Required middleware.
 */
import jwt from "jsonwebtoken";
import * as apiResponse from "../util/restful.response.util";
import { ENABLE_TOKENIZATION, ENABLE_TOKENIZATION_SECRET } from "../util/secrets.util";
import { Request, Response, NextFunction } from "express";

/**
 * isAuthenticated
 * @param req
 * @param res
 * @param next
 *
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (ENABLE_TOKENIZATION === "true") {
    const token = req.headers["x-session-token"] && req.headers["x-session-token"].toString();
    jwt.verify(`${token}`, ENABLE_TOKENIZATION_SECRET, function (err: any, decoded: any) {
      try {
        if (err) {
          if (err.name === "TokenExpiredError") {
            apiResponse.errorHandler(res, {"statusCode": 403, "data": err, "message": "Failed to authenticate, token expired"});
          } else {
            apiResponse.errorHandler(res, {"statusCode": 401, "data": err, "message": "Failed to authenticate, invalid token"});
          }
        } else {
          next();
        }
      } catch (e) {
        apiResponse.default(res, e);
      }
    });
  } else {
    next();
  }
};
