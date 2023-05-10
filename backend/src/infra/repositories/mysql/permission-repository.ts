import { CreatePermission, GetPermissionsById } from '@/domain/contracts/repos'
import { Permission } from './entities'
import DataSource from './data-source'

import { ObjectType, Repository } from 'typeorm'

export class PermissionRepository
  implements CreatePermission, GetPermissionsById
{
  getRepository(entity: ObjectType<Permission>): Repository<Permission> {
    return DataSource.getRepository(entity)
  }

  async create({
    permissionName,
    humanizedPermissionName,
    entity,
    humanizedEntity
  }: CreatePermission.Input): Promise<CreatePermission.Output> {
    const permissionRepo = this.getRepository(Permission)
    const permission = permissionRepo.create({
      permissionName,
      humanizedPermissionName,
      entity,
      humanizedEntity
    })

    await permissionRepo.save(permission)

    return {
      id: permission.id,
      permissionName: permission.permissionName,
      humanizedPermissionName: permission.humanizedPermissionName,
      entity: permission.entity,
      humanizedEntity: permission.humanizedEntity
    }
  }

  async getAllById(
    input: GetPermissionsById.Input
  ): Promise<GetPermissionsById.Output> {
    const permissionRepo = this.getRepository(Permission)
    let permissions: Permission[]

    if (input?.ids) {
      permissions = await permissionRepo.query(
        'SELECT * FROM permission WHERE id IN (?)',
        [[input.ids]]
      )
    }

    if (permissions) {
      return permissions.map((permission: Permission) => ({
        id: permission.id,
        permissionName: permission.permissionName,
        humanizedPermissionName: permission.humanizedPermissionName,
        entity: permission.entity,
        humanizedEntity: permission.humanizedEntity
      }))
    }

    return []
  }
}
