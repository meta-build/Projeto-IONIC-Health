import { Controller } from '@/application/controllers'
import AppDataSource from '@/infra/repositories/mysql/data-source'
import { Rating } from '@/infra/repositories/mysql/entities'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { UnauthorizedError } from '@/application/errors'
import { RatingRepository } from '@/infra/repositories/mysql/rating-repository'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'

type HttpRequest = {
  requesterId: number,
  value: number,
  committee: string,
  comment: string,
  ticketId: number
}

export class CreateRatingController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly userRepository: UserRepository,
    private readonly ratingRepository: RatingRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req)

    if (error) {
      return badRequest(error)
    }

    const { requesterId, value, committee, comment, ticketId } = req

    const reviewer = await this.userRepository.loadById({ id: requesterId })

    if (!reviewer) {
      return badRequest(new UnauthorizedError)
    }

    const ticket = await this.ticketRepository.loadTicketById({ id: ticketId })

    if (!ticket) {
      return badRequest(new UnauthorizedError)
    }

    const rating = await this.ratingRepository.create({
      comment,
      committee,
      value,
      ticketId,
      requesterId
    })

    await AppDataSource.manager.save(Rating, rating)

    return ok(rating)
  }
}
