import { RequiredFieldError } from '@/application/errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] === null || input[this.fieldName] === undefined) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
