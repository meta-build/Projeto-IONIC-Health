export interface DbCreateUser {
  create: (input: DbCreateUser.Input) => Promise<DbCreateUser.Output>
}

export namespace DbCreateUser {
  export type Input = {
    name: string
    email: string
    password: string
    roleId: number
  }
  export type Output = {
    id: string
    name: string
    email: string
    password: string
    roleId: number
  }
}
