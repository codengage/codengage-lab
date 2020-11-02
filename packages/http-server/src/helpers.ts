import { HttpResponse } from './http'

export const ok = <T>(data: T): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const created = <T>(data: T): HttpResponse => ({
  statusCode: 201,
  body: data,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
})

export const badRequest = (error?: { [key: string]: any }): HttpResponse => ({
  statusCode: 400,
  body: {
    error: 'bad request',
    message: error instanceof Error ? error.message : error,
  },
})

export const unauthorized = (error?: { [key: string]: any }): HttpResponse => ({
  statusCode: 401,
  body: {
    error: 'unauthorized',
    message: error instanceof Error ? error.message : error,
  },
})

export const forbidden = (error?: { [key: string]: any }): HttpResponse => ({
  statusCode: 403,
  body: {
    error: 'forbidden',
    message: error instanceof Error ? error.message : error,
  },
})

export const serverError = (error?: { [key: string]: any }): HttpResponse => ({
  statusCode: 500,
  body: {
    error: 'internal server error',
    message: error instanceof Error ? error.message : error,
  },
})
