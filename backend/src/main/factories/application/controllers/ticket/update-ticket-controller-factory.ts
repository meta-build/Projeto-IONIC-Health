import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'
import { makeUpdateTicketValidation } from './update-ticket-validation'
import { Controller, UpdateTicketController } from '@/application/controllers'

export const makeUpdateTicketController = (): Controller => {
  const ticketRepository = new TicketRepository()
  return new UpdateTicketController(makeUpdateTicketValidation(), ticketRepository)
}
