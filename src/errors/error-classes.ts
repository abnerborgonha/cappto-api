import { ApiError } from './api-error.ts';

// 400 - Bad Request
export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', errorCode = 'general/bad-request') {
    super(message, 400, true, errorCode);
  }
}

// 401 - Unauthorized
export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', errorCode = 'auth/unauthorized') {
    super(message, 401, true, errorCode);
  }
}

// 403 - Forbidden
export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', errorCode = 'auth/forbidden-access') {
    super(message, 403, true, errorCode);
  }
}

// 404 - Not Found
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found', errorCode = 'general/not-found') {
    super(message, 404, true, errorCode);
  }
}

// 409 - Conflict
export class ConflictError extends ApiError {
  constructor(message = 'Conflict', errorCode = 'general/conflict') {
    super(message, 409, true, errorCode);
  }
}

// 422 - Unprocessable Entity (Validation Error)
export class UnprocessableEntityError extends ApiError {
  constructor(
    // biome-ignore lint/suspicious/noExplicitAny: has any
    errors: any, // Can be an array or object with validation details
    message = 'Unprocessable Entity',
    errorCode = 'general/validation-error'
  ) {
    super(message, 422, true, errorCode, errors);
  }
}


// 500 - Internal Server Error
export class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error', errorCode = 'general/internal-server-error') {
    super(message, 500, true, errorCode);
  }
}