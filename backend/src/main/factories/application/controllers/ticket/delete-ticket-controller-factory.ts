import { Controller, DeleteTicketByIdController } from '@/application/controllers'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'
import { makeLocalFileStorage } from '@/main/factories/infra/storage'

export const makeDeleteTicketByIdController = (): Controller => {
  const ticketRepository = new TicketRepository()
  return new DeleteTicketByIdController(ticketRepository, makeLocalFileStorage())
}
