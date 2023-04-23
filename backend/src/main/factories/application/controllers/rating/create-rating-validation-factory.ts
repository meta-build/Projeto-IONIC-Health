import { RequiredFieldValidation, Validation, ValidationComposite } from '../../../../../application/validation'

export const makeCreateRatingValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['value', 'committee', 'comment', 'ticketId']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
