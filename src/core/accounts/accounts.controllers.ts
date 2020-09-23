import { Request, Response } from "express";
import { AccountsService } from "./accounts.service";
const AccountsServiceInstance = new AccountsService();
/**
 * Summary: Create account
 * @description Create account
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
export const createAccounts = async (req: Request): Promise<Object> => {

  /** Express JS Validation: path, param or body, message */
  req.assert("firstname", "firstname cannot be less than 2 characters").notEmpty();
  req.assert("lastname", "lastname cannot be less than 2 characters").notEmpty();

  const _errors = req.validationErrors();
  if (_errors) {
    return {
      statusCode: 422,
      data: _errors
    };
  }

  return await AccountsServiceInstance.createAccountsSrv(req.headers, req.params, req.body);

};
/**
 * Summary: Get account
 * @description Get account
 * @method getAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
export const getAllAccounts = async (req: Request): Promise<Object> => {

  /** Express JS Validation: path, param or body, message */
  req.assert("skip", "skip cannot be less than 2 characters").notEmpty();
  req.assert("limit", "limit cannot be less than 2 characters").notEmpty();
  req.assert("sort", "sort cannot be less than 2 characters").notEmpty();

  const _errors = req.validationErrors();
  if (_errors) {
    return {
      statusCode: 422,
      data: _errors
    };
  }

  return await AccountsServiceInstance.getAllAccountsSrv(req.headers, req.params);

};
/**
 * Summary: Returns account information by Id
 * @description Returns account information associated with the ID requested
 * @method getAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
export const getAccountById = async (req: Request): Promise<Object> => {

  /** Express JS Validation: path, param or body, message */
  req.checkHeaders("x-session-token", "missing session token").notEmpty();
  req.assert("user_id", "user_id cannot be less than 2 characters").notEmpty();
  req.assert("user_id", "invalid user_id provided").isHash("sha1");

  const _errors = req.validationErrors();
  if (_errors) {
    return {
      statusCode: 422,
      data: _errors
    };
  }

  /** Get the account by id using the service */
  return await AccountsServiceInstance.getAccountByIdSrvc(req.headers, req.params);

};
/**
 * Summary: Create account
 * @description Create account
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
export const updateAccountById = async (req: Request): Promise<Object> => {

  /** Express JS Validation: path, param or body, message */
  req.checkHeaders("x-session-token", "missing session token").notEmpty();
  req.assert("user_id", "user_id cannot be less than 2 characters").notEmpty();
  req.assert("user_id", "invalid user_id provided").isHash("sha1");
  req.assert("firstname", "firstname cannot be less than 2 characters").notEmpty();
  req.assert("lastname", "lastname cannot be less than 2 characters").notEmpty();

  const _errors = req.validationErrors();
  if (_errors) {
    return {
      statusCode: 422,
      data: _errors
    };
  }

  return await AccountsServiceInstance.updateAccountByIdSrv(req.headers, req.params, req.body);

};

/**
 * Summary: Create account
 * @description Create account
 * @method createAccounts
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
export const deleteAccountById = async (req: Request): Promise<Object> => {

  /** Express JS Validation: path, param or body, message */
  req.checkHeaders("x-session-token", "missing session token").notEmpty();
  req.assert("user_id", "user_id cannot be less than 2 characters").notEmpty();
  req.assert("user_id", "invalid user_id provided").isHash("sha1");

  const _errors = req.validationErrors();
  if (_errors) {
    return {
      statusCode: 422,
      data: _errors
    };
  }

  return await AccountsServiceInstance.deleteAccountByIdSrv(req.headers, req.params, req.body);

};

/**
 * Summary: Returns account information by Id
 * @description Returns account information associated with the ID requested
 * @method getAccountById
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 *
 * @beta
 */
export const searchAccountByCriteria = async (req: Request): Promise<Object> => {

  /** Express JS Validation: path, param or body, message */
  req.checkHeaders("x-session-token", "missing session token").notEmpty();
  req.assert("criteria", "criteria cannot be less than 2 characters").notEmpty();
  req.assert("criteria", "Only alphanumerics characters are allowed").isAlphanumeric();
  req.assert("criteria", "criteria cannot be less than 2 characters").escape();

  const _errors = req.validationErrors();
  if (_errors) {
    return {
      statusCode: 422,
      data: _errors
    };
  }

  /** Get the account by id using the service */
  return await AccountsServiceInstance.searchAccountByCriteriaSrvc(req.headers, req.params, req.query);

};