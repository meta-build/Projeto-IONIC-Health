import { HttpResponse, forbidden, ok, serverError } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { LoadUserById } from '@/domain/contracts/repos/user'
import { Role } from '@/infra/repositories/mysql/entities'
import env from '@/main/config/env'

import jwt, { JsonWebTokenError } from 'jsonwebtoken'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadUserById: LoadUserById,
    private readonly requiredPermissions: string[]
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

        const user = await this.loadUserById.loadById({ id: decoded.id })

        const hasPermission = this.hasPermission(user.role)

        if (hasPermission) {
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

  private hasPermission(role: Role) {
    if (!this.requiredPermissions) {
      return true
    }

    if (role.isAdmin) {
      return true
    }

    return this.requiredPermissions.every((requiredPermission) =>
      role.permissions.some((permission) => permission.permissionName === requiredPermission)
    )
  }
}
