import { UnauthorizedError, InactiveUserError } from '@/application/errors'
import { HttpResponse, forbidden, ok, serverError } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { LoadUserById } from '@/domain/contracts/repos/user'
import { Permission, User } from '@/infra/repositories/mysql/entities'
import env from '@/main/config/env'

import jwt, { JsonWebTokenError } from 'jsonwebtoken'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadUserById: LoadUserById,
    private readonly requiredPermissions: string[],
    private readonly everyPermission: boolean
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    const authorization = httpRequest.headers.authorization

    if (!authorization) {
      return forbidden(new UnauthorizedError())
    }
    
    try {
      const [, token] = authorization.split(' ')
      const decoded = <{id: number}>jwt.verify(token, env.jwtSecret)
      
      if (!decoded?.id) {
        return forbidden(new UnauthorizedError())
      } else {
        
        const user = await this.loadUserById.loadById({ id: decoded.id })
        
        if (!user.isActive) {
          return forbidden(new InactiveUserError())
        }
        
        const hasPermission = this.hasPermission(user, httpRequest.routePath)

        if (hasPermission) {
          return ok({ requesterId: decoded.id, requester: user })
        }

        return forbidden(new UnauthorizedError())
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return forbidden(error)
      }

      return serverError(error)
    }
  }

  private hasPermission(user: LoadUserById.Output, routePath: string) {
    if (this.requiredPermissions.length === 0) {
      return true
    }

    if (this.everyPermission) {
      return this.hasEveryPermission(user.role.permissions)
    } else {
      return this.hasSomePermission(user, routePath)
    }
  }

  private hasEveryPermission(permissions: Permission[]) {
    return this.requiredPermissions.every((requiredPermission) =>
      permissions.some((permission) => permission.permissionName === requiredPermission)
    )
  }

  private hasSomePermission(user: LoadUserById.Output, routePath: string) {
    if (routePath === `/user/${user.id}`) {
      return true
    }

    return this.requiredPermissions.some((requiredPermission) =>
      user.role.permissions.some((permission) => permission.permissionName === requiredPermission)
    )
  }
}
