import {
  RequiredFieldValidation,
  Validation,
  ValidationComposite
} from '@/application/validation'

export const makeCreatePermissionValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['permissionName', 'humanizedPermissionName', 'entity', 'humanizedEntity']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
