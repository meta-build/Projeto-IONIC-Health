import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

type HttpRequest = {
  name: string
  permissions?: number[]
}

export class CreateRoleController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly roleRepository: RoleRepository,
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req)

    if (error) {
      return badRequest(error)
    }

    let permissions = []

    const createdRole = await this.roleRepository.create(
      Object.assign({}, req, { permissions })
    )

    return ok(createdRole)
  }
}
