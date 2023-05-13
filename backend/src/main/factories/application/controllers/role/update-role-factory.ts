import { Controller, UpdateRoleController } from '@/application/controllers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'
import { makeUpdateRoleValidation } from './update-role-validation'

export const makeUpdateRoleFactory = (): Controller => {
  const permissionRepository = new PermissionRepository()
  const roleRepository = new RoleRepository
  return new UpdateRoleController(makeUpdateRoleValidation(), roleRepository, permissionRepository)
}
