import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'
import { Controller } from '@/application/controllers'
import { HttpResponse, badRequest, ok } from '@/application/helpers'

type HttpRequest = {
  params: any
}

export class GetTicketByIdController implements Controller {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.params.id
    const ticket = await this.ticketRepository.loadById({ id })

    if (!ticket) {
      return badRequest(new Error())
    }

    return ok(ticket)
  }
}
