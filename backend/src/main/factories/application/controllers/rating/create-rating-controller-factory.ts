import { Controller, CreateRatingController } from '@/application/controllers'
import { makeCreateRatingValidation } from './create-rating-validation-factory'

export const makeCreateRatingController = (): Controller => {
  return new CreateRatingController(makeCreateRatingValidation())
}
