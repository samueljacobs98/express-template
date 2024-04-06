import { Request, Response } from "express";
import { DomainError, InternalError } from "../core/models/errors";
import { Logger } from "../utils";

const logger = Logger.new("request-wrapper");

export const requestWrapper =
  (fn: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (err) {
      const error =
        err instanceof DomainError ? err : new InternalError(`${err}`);

      logger.error(
        "requestWrapper",
        `Responding with error:\n\tname: ${error.name}\n\tcode: ${error.code}\n\tmessage: ${error.message}\n`
      );
      error.asResponse(res);
    }
  };
