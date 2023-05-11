export class UnauthorizedError extends Error {
  constructor () {
    super('Você não tem permissão para acessar este recurso.')
    this.name = 'UnauthorizedError'
  }
}

export class AuthenticationError extends Error {
  constructor () {
    super('Falha na autenticação.')
    this.name = 'AuthenticationError'
  }
}

export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
