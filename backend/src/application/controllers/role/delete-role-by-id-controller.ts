import { Controller } from '@/application/controllers'
import { HttpResponse, badRequest, noContent } from '@/application/helpers'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

interface HttpRequest {
  params: { id: number }
}

export class DeleteRoleByIdController implements Controller {
  constructor(private readonly roleRepository: RoleRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const role = await this.roleRepository.loadById({ id: httpRequest.params.id })

    if (!role) {
      return badRequest(new Error(`Role with id ${httpRequest.params.id} not found`))
    }

    await this.roleRepository.deleteById({ id: role.id })

    return noContent()
  }
}
