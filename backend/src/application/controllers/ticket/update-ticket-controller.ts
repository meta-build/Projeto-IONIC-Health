import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'

type HttpRequest = {
  params: { id: number }
  title?: string
  description?: string
  status?: string
}

export class UpdateTicketController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly ticketRepository: TicketRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest)

    if (error) {
      return badRequest(error)
    }

    const updatedTicket = await this.ticketRepository.update({
      id: httpRequest.params.id,
      title: httpRequest.title,
      description: httpRequest.description,
      status: httpRequest.status
    })

    return ok(updatedTicket)
  }
}
