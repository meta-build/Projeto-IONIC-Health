import { Controller, DeleteRoleByIdController } from '@/application/controllers'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

export const makeDeleteRoleByIdController = (): Controller => {
  const roleRepository = new RoleRepository()
  return new DeleteRoleByIdController(roleRepository)
}
