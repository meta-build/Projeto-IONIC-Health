import { RequiredFieldValidation, StringInputValidation, Validation, ValidationComposite } from '@/application/validation'

export const makeCreateTicketValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['title', 'type', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new StringInputValidation('type', ['HOTFIX', 'FEATURE']))

  return new ValidationComposite(validations)
}
