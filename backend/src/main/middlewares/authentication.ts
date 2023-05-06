import { UnauthorizedError } from '@/application/errors/http'
import { HttpResponse, forbidden, ok, serverError } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { LoadUserById } from '@/domain/contracts/repos/user'
import env from '@/main/config/env'

import jwt, { JsonWebTokenError } from 'jsonwebtoken'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadUserById: LoadUserById
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    const authorization = httpRequest.headers.authorization

    if (!authorization) {
      return forbidden()
    }

    try {
      const [, token] = authorization.split(' ')
      const decoded = <{id: number}>jwt.verify(token, env.jwtSecret)

      if (!decoded?.id) {
        return forbidden()
      } else {

        const user = this.loadUserById.loadById({ id: decoded.id })

        if (user) {
          return ok({ requesterId: decoded.id })
        }

        return forbidden()
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return forbidden()
      }

      return serverError(error)
    }
  }
}
