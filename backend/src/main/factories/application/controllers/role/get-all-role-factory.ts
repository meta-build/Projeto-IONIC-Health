import { Controller, GetAllRoleController } from '@/application/controllers'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

export const makeGetAllRoleController = (): Controller => {
  const roleRepository = new RoleRepository()
  return new GetAllRoleController(roleRepository)
}
