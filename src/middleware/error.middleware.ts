import { ErrorHandler } from '@/errors/errorHandler'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export function errorMiddleware(
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
): Response {
  
  if (error instanceof ErrorHandler)
    return response.status(error.statusCode).send({ message: error.message, code: error.code })

  if (error instanceof ZodError)
    return response.status(400).send({ message: 'Validation error.', issues: error.format() })

  return response.status(500).send({ message: error.message || 'Internal Server Error' })

  next()
}
