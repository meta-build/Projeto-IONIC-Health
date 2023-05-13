import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'

export class GetAllPermissionController implements Controller {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async handle(): Promise<HttpResponse> {
    const permissions = await this.permissionRepository.loadAll()

    return ok(permissions)
  }
}
