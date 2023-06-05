import { ServerError, UnauthorizedError, UnprocessableEntity } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: null
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  data: error
})

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  data: error
})

export const unprocessableEntity = (): HttpResponse<Error> => ({
  statusCode: 422,
  data: new UnprocessableEntity
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: new ServerError(error.stack)
})
