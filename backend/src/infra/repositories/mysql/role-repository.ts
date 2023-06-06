import {
  CreateRole,
  LoadAllRole,
  LoadRoleById,
  UpdateRole
} from '@/domain/contracts/repos'
import { Role } from './entities'
import DataSource from './data-source'

import { Repository } from 'typeorm'

export class RoleRepository
  implements CreateRole, UpdateRole, LoadRoleById, LoadAllRole
{
  getRepository(): Repository<Role> {
    return DataSource.getRepository(Role)
  }

  async create({
    name,
    permissions
  }: CreateRole.Input): Promise<CreateRole.Output> {
    const roleRepository = this.getRepository()
    const role = roleRepository.create({
      name,
      permissions
    })

    await roleRepository.save(role)

    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions
    }
  }

  async update({
    id,
    name,
    permissions
  }: UpdateRole.Input): Promise<UpdateRole.Output> {
    const roleRepository = this.getRepository()
    const role = await roleRepository.findOneBy({ id })

    role.name = name ?? role.name
    role.permissions = permissions ?? role.permissions

    await roleRepository.save(role)

    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions
    }
  }

  async loadById({ id }: LoadRoleById.Input): Promise<LoadRoleById.Output> {
    const roleRepository = this.getRepository()
    const role = await roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('role.id = :id', { id })
      .getOne()

    if (!role) {
      return null
    }

    return role
  }

  async loadAll (): Promise<LoadAllRole.Output> {
    const roleRepository = this.getRepository()

    const roles = await roleRepository
    .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .getMany()

    return roles
  }
}
