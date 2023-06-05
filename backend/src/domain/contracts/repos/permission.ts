import { Role } from '@/infra/repositories/mysql/entities'

export interface CreatePermission {
  create: (input: CreatePermission.Input) => Promise<CreatePermission.Output>
}

export namespace CreatePermission {
  export type Input = {
    permissionName: string
    humanizedPermissionName: string
    entity: string
    humanizedEntity: string
  }
  export type Output = {
    id: number
    permissionName: string
    humanizedPermissionName: string
    entity: string
    humanizedEntity: string
  }
}

export interface GetPermissionsById {
  getAllById: (input: GetPermissionsById.Input) => Promise<GetPermissionsById.Output>
}

export namespace GetPermissionsById {
  export type Input = {
    ids: number[]
  }

  export type Output = Array<{
    id: number
    permissionName: string
    humanizedPermissionName: string
    entity: string
    roles: Role[]
    humanizedEntity: string
  }>
}

export interface LoadAllPermissions {
  loadAll: () => Promise<LoadAllPermissions.Output>
}

export namespace LoadAllPermissions {
  export type Output = Array<{
    id: number
    permissionName: string
    humanizedPermissionName: string
    entity: string
    humanizedEntity: string
  }>
}

