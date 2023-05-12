import { ServerError, UnauthorizedError, UnprocessableEntity } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const forbidden = (): HttpResponse<Error> => ({
  statusCode: 403,
  data: new UnauthorizedError()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  data: new ServerError(error.stack)
})

export const unprocessableEntity = (): HttpResponse<Error> => ({
  statusCode: 422,
  data: new UnprocessableEntity
})
