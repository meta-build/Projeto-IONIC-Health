import { UnauthorizedError } from '@/application/errors/http'
import { HttpResponse, forbidden, ok } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { LoadUserById } from '@/domain/contracts/repos/user'
import env from '@/main/config/env'

import jwt from 'jsonwebtoken'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadUserById: LoadUserById
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    const authorization = httpRequest.headers.authorization

    try {
      const [, token] = authorization.split(' ')
      const decoded = <{id: number}>jwt.verify(token, env.jwtSecret)

      if (!decoded?.id) {
        return forbidden(new UnauthorizedError())
      } else {

        const user = this.loadUserById.loadById({ id: decoded.id })

        if (user) {
          return ok({ requesterId: decoded.id })
        }

        return forbidden(new UnauthorizedError())
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: new Error('InternalServerError')
      }
    }
  }
}
