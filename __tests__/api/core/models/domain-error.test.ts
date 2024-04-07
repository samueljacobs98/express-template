import { Response } from "express";
import { DomainError } from "@src/api/core/models/errors";

class TestError extends DomainError {
  constructor(message: string) {
    super("TestError", message, 400);
  }
}

describe("DomainError", () => {
  describe("constructor", () => {
    it("should properly initialize class properties", () => {
      const message = "An error occurred";
      const error = new TestError(message);

      expect(error.name).toBe("TestError");
      expect(error.message).toBe(message);
      expect(error.code).toBe(400);
    });
  });

  describe("asResponse", () => {
    it("should set the correct response status and body", () => {
      const message = "An error occurred";

      const expectedError = { code: 400, message };

      const error = new TestError(message);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      error.asResponse(res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: expectedError,
      });
    });
  });

  describe("TestError", () => {
    it("should be an instance of TestError, DomainError, and Error", () => {
      const testError = new TestError("An error occurred");

      expect(testError).toBeInstanceOf(TestError);
      expect(testError).toBeInstanceOf(DomainError);
      expect(testError).toBeInstanceOf(Error);
    });
  });
});
