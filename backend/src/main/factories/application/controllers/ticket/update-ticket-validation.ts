import {
  StringInputValidation,
  Validation,
  ValidationComposite
} from '@/application/validation'

export const makeUpdateTicketValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  validations.push(
    new StringInputValidation('status', ['RATING', 'NEW', 'ONHOLDING', 'DONE'])
  )

  return new ValidationComposite(validations)
}
