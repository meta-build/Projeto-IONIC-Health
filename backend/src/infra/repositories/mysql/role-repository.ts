import { CreateRole, LoadRoleById, UpdateRole } from '@/domain/contracts/repos'
import { Role } from './entities'
import DataSource from './data-source'

import { ObjectType, Repository } from 'typeorm'

export class RoleRepository implements CreateRole, UpdateRole, LoadRoleById {
  getRepository(entity: ObjectType<Role>): Repository<Role> {
    return DataSource.getRepository(entity)
  }

  async create({
    name,
    isAdmin,
    permissions
  }: CreateRole.Input): Promise<CreateRole.Output> {
    const roleRepository = this.getRepository(Role)
    const role = roleRepository.create({
      name,
      isAdmin,
      permissions
    })

    await roleRepository.save(role)

    return {
      id: role.id,
      name: role.name,
      isAdmin: role.isAdmin,
      permissions: role.permissions
    }
  }

  async update({
    id,
    name,
    isAdmin,
    permissions
  }: UpdateRole.Input): Promise<UpdateRole.Output> {
    const roleRepository = this.getRepository(Role)
    const role = await roleRepository.findOneBy({ id })

    role.name = name ?? role.name
    role.isAdmin = isAdmin ?? role.isAdmin
    role.permissions = permissions ?? role.permissions

    await roleRepository.save(role)

    return {
      id: role.id,
      name: role.name,
      isAdmin: role.isAdmin,
      permissions: role.permissions
    }
  }

  async loadById({ id }: LoadRoleById.Input): Promise<LoadRoleById.Output> {
    const roleRepository = this.getRepository(Role)
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
}
