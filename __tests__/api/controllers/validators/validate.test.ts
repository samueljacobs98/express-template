import { z, ZodError, ZodIssue } from "zod";
import { Request } from "express";
import { validate } from "@src/api/controllers/validators";
import { BadRequestError, ValidationError } from "@src/api/core/models/errors";

const schema = z.object({
  body: z.object({
    name: z.string(),
    age: z.number().min(18).optional(),
    username: z.string().optional(),
  }),
});

describe("validate", () => {
  describe("when the request is valid", () => {
    describe("should return validated data", () => {
      const test = (request: Partial<Request>, expected: any) => {
        const result = validate(request as Request, schema);
        expect(result).toEqual(expected);
      };

      it("when no optional fields are provided", async () => {
        const request: Partial<Request> = { body: { name: "John Doe" } };

        const expected = { body: { name: "John Doe" } };

        test(request, expected);
      });

      it("when optional fields are provided", async () => {
        const request: Partial<Request> = {
          body: { name: "John Doe", age: 30 },
        };

        const expected = { body: { name: "John Doe", age: 30 } };

        test(request, expected);
      });
    });
  });

  describe("when the request is invalid", () => {
    describe("should throw ValidationError", () => {
      const test = (
        invalidRequest: Partial<Request>,
        expectedIssues: { code: string; message: string; path: string }[]
      ) => {
        try {
          validate(invalidRequest as Request, schema);
        } catch (error) {
          if (!(error instanceof ValidationError)) {
            throw error;
          }

          expect(error).toBeInstanceOf(ValidationError);

          const issues = error.getIssues();

          expect(issues).toHaveLength(expectedIssues.length);
          expect(issues).toEqual(expectedIssues);
        }
      };

      describe("with a single issue", () => {
        it("when required fields are missing", () => {
          const invalidRequest: Partial<Request> = {
            body: {},
          };

          const expectedIssues = [
            {
              code: "invalid_type",
              message: "Required",
              path: `/${["body", "name"].join("/")}`,
            },
          ];

          test(invalidRequest, expectedIssues);
        });

        it("when fields have incorrect types", () => {
          const invalidRequest: Partial<Request> = {
            body: {
              name: 123,
            },
          };

          const expectedIssues = [
            {
              code: "invalid_type",
              message: "Expected string, received number",
              path: `/${["body", "name"].join("/")}`,
            },
          ];

          test(invalidRequest, expectedIssues);
        });

        it("when fields have invalid values", () => {
          const invalidRequest: Partial<Request> = {
            body: {
              name: "John Doe",
              age: 17,
            },
          };

          const expectedIssues = [
            {
              code: "too_small",
              message: "Number must be greater than or equal to 18",
              path: `/${["body", "age"].join("/")}`,
            },
          ];

          test(invalidRequest, expectedIssues);
        });
      });

      describe("with multiple issues", () => {
        it("when multiple invalid fields are provided", () => {
          const invalidRequest: Partial<Request> = {
            body: {
              age: 17,
              username: 123,
            },
          };

          const expectedIssues = [
            {
              code: "invalid_type",
              message: "Required",
              path: `/${["body", "name"].join("/")}`,
            },
            {
              code: "too_small",
              message: "Number must be greater than or equal to 18",
              path: `/${["body", "age"].join("/")}`,
            },
            {
              code: "invalid_type",
              message: "Expected string, received number",
              path: `/${["body", "username"].join("/")}`,
            },
          ];

          test(invalidRequest, expectedIssues);
        });
      });
    });
  });
});
