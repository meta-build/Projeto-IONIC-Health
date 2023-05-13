import { Controller, GetAllTicketController } from '@/application/controllers'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'

export const makeGetAllTicketController = (): Controller => {
  const ticketRepository = new TicketRepository()
  return new GetAllTicketController(ticketRepository)
}
