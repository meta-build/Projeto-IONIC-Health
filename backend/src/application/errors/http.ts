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

export class UnprocessableEntity extends Error {
  constructor () {
    super('Unprocessable Entity')
    this.name = 'UnprocessableEntity'
  }
}

export class NotFound extends Error {
  constructor () {
    super('Recurso não encontrado')
    this.name = 'NotFoundError'
  }
}
