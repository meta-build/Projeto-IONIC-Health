import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'

type HttpRequest = {
  permissionName: string
  humanizedPermissionName: string
  entity: string
  humanizedEntity: string
}

export class CreatePermissionController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly userRepository: PermissionRepository
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req)

    if (error) {
      return badRequest(error)
    }

    const createdUser = await this.userRepository.create(req)

    return ok(createdUser)
  }
}
