import { Controller, GetRoleByIdController } from '@/application/controllers'
import { RoleRepository } from '@/infra/repositories/mysql/role-repository'

export const makeGetRoleByIdController = (): Controller => {
  const roleRepository = new RoleRepository()
  return new GetRoleByIdController(roleRepository)
}
