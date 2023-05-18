import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

export class GetAllRoleController implements Controller {
  constructor(
    private readonly roleRepository: RoleRepository
  ) {}

  async handle(): Promise<HttpResponse> {
    const roles = await this.roleRepository.loadAll()

    return ok(roles)
  }
}
