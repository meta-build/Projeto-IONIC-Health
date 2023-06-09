import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

type HttpRequest = {
  params: { id: number }
  name: string
  isAdmin: boolean
  permissions?: number[]
}

export class UpdateRoleController implements Controller {
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

    let permissions = []

    if (!req.isAdmin) {
      permissions = await this.permissionRepository.getAllById({ ids: req.permissions })
    }

    const updatedRole = await this.roleRepository.update(
      Object.assign({}, req, { id: req.params.id, permissions })
    )

    return ok(updatedRole)
  }
}
