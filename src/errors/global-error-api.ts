import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { env } from '@/env.ts';
import { ApiError } from './api-error.ts';
import { UnprocessableEntityError } from './error-classes.ts';

interface ErrorResponse {
  status: 'fail' | 'error';
  errorCode?: string;
  message: string;
  // biome-ignore lint/suspicious/noExplicitAny: has any
  errors?: any;
  stack?: string;
}

/**
 * @function globalErrorHandler
 * @description Centralized error handler for the Fastify application.
 */
export const globalErrorHandler = (
  error: FastifyError | ApiError | Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const isProduction = env.NODE_ENV === 'production';

  if (error instanceof ApiError && error.isOperational) {
    request.log.warn(error, `Operational error caught: ${error.message}`);
  } else {
    request.log.error(error, `An unexpected error occurred: ${error.message}`);
  }

  if ('validation' in error && error.validation) {
    const validationError = new UnprocessableEntityError(
      error.validation,
      'A validation error occurred'
    );
    const response: ErrorResponse = {
      status: validationError.status,
      errorCode: validationError.errorCode,
      message: validationError.message,
      errors: validationError.errors,
    };
    return reply.status(validationError.statusCode).send(response);
  }

  if (error instanceof ApiError) {
    const response: ErrorResponse = {
      status: error.status,
      errorCode: error.errorCode,
      message: error.message,
      errors: error.errors,
    };

    if (!isProduction) {
      response.stack = error.stack;
    }
    return reply.status(error.statusCode).send(response);
  }

  const statusCode = 500;
  const response: ErrorResponse = {
    status: 'error',
    errorCode: 'general/internal-error',
    message: isProduction
      ? 'An internal server error occurred.'
      : error.message,
  };

  if (!isProduction) {
    response.stack = error.stack;
  }

  reply.status(statusCode).send(response);
};
