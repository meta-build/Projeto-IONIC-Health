import { Controller, GetAllPermissionController } from '@/application/controllers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'

export const makeGetAllPermissionFactory = (): Controller => {
  const permissionRepository = new PermissionRepository()
  return new GetAllPermissionController(permissionRepository)
}
