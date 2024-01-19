import { Request, Response, NextFunction } from "express";
import { logger, sendResponse } from "../utils/index.util";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = `${error.name}: ${error.message}`
  logger.error(message);
  console.log(error.stack);
  return sendResponse(res, 500, false, message);
};