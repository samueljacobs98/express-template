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
  constructor(info: string) {
    super("BadRequestError", info, 400);
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
