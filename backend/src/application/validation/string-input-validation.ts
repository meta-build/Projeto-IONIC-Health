import { InvalidInput } from '@/application/errors'
import { Validation } from './validation'

export class StringInputValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly validInput: string[]
  ) {}

  validate (input: any): Error {
    if (this.validInput.includes(input[this.fieldName].toUpperCase())) {
      return
    }
    return new InvalidInput(input[this.fieldName], this.validInput)
  }
}
