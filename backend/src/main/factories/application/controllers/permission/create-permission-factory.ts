import { Controller, CreatePermissionController } from '@/application/controllers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'
import { makeCreatePermissionValidation } from './create-permission-validation'

export const makeCreatePermissionFactory = (): Controller => {
  const permissionRepository = new PermissionRepository()
  return new CreatePermissionController(makeCreatePermissionValidation(), permissionRepository)
}
