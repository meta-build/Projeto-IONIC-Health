import { InvalidParamError } from '../errors'
import { Validation } from './validation'
import validator from 'validator'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string
  ) { }

  validate(input: any): Error {
    if (input[this.fieldName]) {
      const isValid = validator.isEmail(input[this.fieldName])

      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
