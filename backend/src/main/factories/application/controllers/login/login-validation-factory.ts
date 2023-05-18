import {
  RequiredFieldValidation,
  EmailValidation,
  Validation,
  ValidationComposite
} from '@/application/validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email'))

  return new ValidationComposite(validations)
}
