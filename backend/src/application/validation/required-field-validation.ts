import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate (input: any): Error {
    console.log(input);
    if (!input[this.fieldName] && input[this.fieldName] !== 0) {
      return new Error(`Missing param: ${this.fieldName}`)
    }
  }
}
