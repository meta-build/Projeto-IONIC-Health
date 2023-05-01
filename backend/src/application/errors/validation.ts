export class RequiredFieldError extends Error {
  constructor(paramName: string) {
    super(`O parâmetro ${paramName} é obrigatório`)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidInput extends Error {
  constructor(input: string, validInput: string[]) {
    super(`O valor ${input} não corresponde a ${validInput}`)
    this.name = 'InvalidInput'
  }
}
