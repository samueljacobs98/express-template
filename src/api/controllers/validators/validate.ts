import { ZodError, ZodSchema } from "zod";
import { BadRequestError } from "../../../api/core/models/errors";
import { Request } from "express";

const zodErrorToMessage = (zodError: ZodError) =>
  zodError.format()._errors.join("\n\t");

export const validate = <T>(req: Request, schema: ZodSchema<T>) => {
  const validationResult = schema.safeParse(req);
  if (!validationResult.success) {
    const { error } = validationResult;
    const message = zodErrorToMessage(error);
    throw new BadRequestError("Invalid request data\n" + message);
  }

  return validationResult.data;
};
