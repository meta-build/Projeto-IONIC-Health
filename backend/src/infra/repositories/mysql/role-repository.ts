import { CreateRole} from '@/domain/contracts/repos'
import { Role } from './entities'
import DataSource from './data-source'

import { ObjectType, Repository } from 'typeorm'

export class RoleRepository
  implements CreateRole
{
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
      permissions: role.permissions,
    }
  }
}
