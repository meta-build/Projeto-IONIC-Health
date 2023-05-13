import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'

export class GetAllTicketController implements Controller {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async handle (): Promise<HttpResponse> {
    const tickets = await this.ticketRepository.loadAll()

    return ok(tickets)
  }
}
