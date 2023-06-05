import {
  RequiredFieldValidation,
  EmailValidation,
  Validation,
  ValidationComposite
} from '@/application/validation'

export const makeCreateUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email'))

  return new ValidationComposite(validations)
}
