import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

type HttpRequest = {
  name: string
  permissions?: number[]
}

export class CreateRoleController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req)

    if (error) {
      return badRequest(error)
    }

    const permissions = await this.permissionRepository.getAllById({ ids: req.permissions })

    const createdRole = await this.roleRepository.create(
      Object.assign({}, req, { permissions })
    )

    return ok(createdRole)
  }
}
