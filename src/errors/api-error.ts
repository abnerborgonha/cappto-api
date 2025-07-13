/**
 * @class ApiError
 * @extends Error
 * @description A custom error class for handling API errors in a structured way.
 */
export class ApiError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;
  readonly errorCode?: string;
  readonly status: 'fail' | 'error';
  // biome-ignore lint/suspicious/noExplicitAny: has any
  readonly errors?: any;

  /**
   * @constructor
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   * @param {boolean} [isOperational=true] - A flag to indicate if this is an operational error.
   * @param {string} [errorCode] - A specific error code for the client.
   * @param {any} [errors] - An object containing more details about the error (e.g., validation errors).
   */
  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    errorCode?: string,
    // biome-ignore lint/suspicious/noExplicitAny: has any
    errors?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    this.errors = errors;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // Capture the stack trace, excluding the error class constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

