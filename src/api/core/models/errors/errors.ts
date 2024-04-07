import { ZodError, ZodIssue } from "zod";
import { DomainError } from "./domain-error";

export class InternalError extends DomainError {
  constructor(info: string) {
    super("InternalError", info, 500);
  }
}

export class NotFoundError extends DomainError {
  constructor(info: string) {
    super("NotFoundError", info, 404);
  }
}

export class BadRequestError extends DomainError {
  constructor(info: string, name?: string) {
    super(name || "BadRequestError", info, 400);
  }
}

interface Issue {
  code: string;
  path: string;
  message: string;
}

export class ValidationError extends BadRequestError {
  private issues: Issue[];

  private static formatIssue(issue: ZodIssue): Issue {
    return {
      code: issue.code,
      path: "/" + issue.path.join("/"),
      message: issue.message,
    };
  }

  constructor(zodError: ZodError) {
    super("Invalid request data", "ValidationError");
    this.issues = zodError.issues.map(ValidationError.formatIssue);
  }

  getIssues() {
    return this.issues;
  }
}

export class UnauthorizedError extends DomainError {
  constructor(info: string) {
    super("UnauthorizedError", info, 401);
  }
}

export class ForbiddenError extends DomainError {
  constructor(info: string) {
    super("ForbiddenError", info, 403);
  }
}
