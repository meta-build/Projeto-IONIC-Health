import { Controller, CreateRoleController } from '@/application/controllers'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'
import { makeCreateRoleValidation } from './create-role-validation'

export const makeCreateRoleFactory = (): Controller => {
  const permissionRepository = new PermissionRepository()
  const roleRepository = new RoleRepository
  return new CreateRoleController(makeCreateRoleValidation(), roleRepository, permissionRepository)
}
