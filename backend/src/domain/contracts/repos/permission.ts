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
