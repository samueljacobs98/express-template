import { ZodSchema } from "zod";
import { ValidationError } from "../../../api/core/models/errors";
import { Request } from "express";

export const validate = <T>(req: Request, schema: ZodSchema<T>) => {
  const validationResult = schema.safeParse(req);
  if (!validationResult.success) {
    const { error } = validationResult;
    throw new ValidationError(error);
  }

  return validationResult.data;
};
