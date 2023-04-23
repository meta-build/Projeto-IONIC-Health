import { CreateRatingController } from '../../../../../application/controllers'
import { makeCreateRatingValidation } from './create-rating-validation-factory'

export const makeCreateRatingController = (): CreateRatingController => {
  return new CreateRatingController(makeCreateRatingValidation())
}
