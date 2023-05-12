import { Controller, CreateRatingController } from '@/application/controllers'
import { makeCreateRatingValidation } from './create-rating-validation-factory'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'
import { RatingRepository } from '@/infra/repositories/mysql/rating-repository'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'

export const makeCreateRatingController = (): Controller => {
  const userRepository = new UserRepository()
  const ratingRepository = new RatingRepository()
  const ticketRepository = new TicketRepository()
  return new CreateRatingController(makeCreateRatingValidation(), userRepository, ratingRepository, ticketRepository)
}
