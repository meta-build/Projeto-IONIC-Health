export interface CreateRole {
  create: (input: CreateRole.Input) => Promise<CreateRole.Output>
}

export namespace CreateRole {
  export type Input = {
    name: string
    isAdmin: boolean
    permissions?: Array<{
      id: number
      permissionName: string
      humanizedPermissionName: string
      entity: string
      humanizedEntity: string
    }>
  }
  export type Output = {
    id: number
    name: string
    isAdmin: boolean
    permissions: Array<{
      id: number
      permissionName: string
      humanizedPermissionName: string
      entity: string
      humanizedEntity: string
    }>
  }
}
