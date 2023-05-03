export class UnauthorizedError extends Error {
  constructor () {
    super('Falha na autenticação')
    this.name = 'UnauthorizedError'
  }
}
