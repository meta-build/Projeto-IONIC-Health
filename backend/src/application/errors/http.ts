export class UnauthorizedError extends Error {
  constructor () {
    super('Falha na autenticação')
    this.name = 'UnauthorizedError'
  }
}

export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
