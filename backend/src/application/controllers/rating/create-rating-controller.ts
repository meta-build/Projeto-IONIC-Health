import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { UnprocessableEntity } from '@/application/errors'
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
      return badRequest(new UnprocessableEntity)
    }

    const ticket = await this.ticketRepository.loadById({ id: ticketId })

    if (!ticket) {
      return badRequest(new UnprocessableEntity)
    }

    const rating = await this.ratingRepository.create({
      comment,
      committee,
      value,
      ticketId,
      requesterId
    })


    return ok(rating)
  }
}
