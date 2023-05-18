import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

interface HttpRequest {
  params: { id: number }
}

export class GetRoleByIdController implements Controller {
  constructor(private readonly roleRepository: RoleRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const role = await this.roleRepository.loadById({ id: httpRequest.params.id })

    return ok(role)
  }
}
