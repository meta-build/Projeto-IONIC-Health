import { Controller } from '@/application/controllers'
import AppDataSource from '@/infra/repositories/mysql/data-source'
import { Rating, Ticket, User } from '@/infra/repositories/mysql/entities'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'

type HttpRequest = {
  requesterId: number,
  value: number,
  committee: string,
  comment: string,
  ticketId: number
}

export class CreateRatingController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req)

    if (error) {
      return badRequest(error)
    }

    const { requesterId, value, committee, comment, ticketId } = req


    const reviewer: any = await AppDataSource.manager
      .findOneByOrFail(User, { id: requesterId })

    const ticket: any = await AppDataSource.manager
      .findOneByOrFail(Ticket, { id: ticketId })

    const rating = new Rating()
    rating.comment = comment
    rating.committee = committee
    rating.value = value
    rating.ticket = ticket
    rating.user = reviewer

    await AppDataSource.manager.save(Rating, rating)

    return ok(rating)
  }
}
