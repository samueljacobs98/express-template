import { Response } from "express";
import { Logger } from "../../../utils";

const logger = Logger.new("DomainError");

export abstract class DomainError extends Error {
  public name: string;
  public code: number;

  constructor(name: string, message: string, code: number) {
    super(message);
    this.name = name;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);

    logger.error(`[${this.name}][${this.code}] - ${this.message}`);
  }

  public asResponse(res: Response): void {
    res.status(this.code).json({
      error: {
        code: this.code,
        message: this.message,
      },
    });
  }
}
