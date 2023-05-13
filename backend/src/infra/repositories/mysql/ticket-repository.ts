import { LoadAllTicket, LoadTicketById } from '@/domain/contracts/repos/ticket'
import { Ticket } from './entities'
import DataSource from './data-source'

import { Repository } from 'typeorm'

export class TicketRepository implements LoadTicketById, LoadAllTicket {
  getRepository(): Repository<Ticket> {
    return DataSource.getRepository(Ticket)
  }

  async loadById({ id }: LoadTicketById.Input): Promise<LoadTicketById.Output> {
    const ticketRepo = this.getRepository()

    const ticket = await ticketRepo
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.ratings', 'rating')
      .leftJoinAndSelect('ticket.attachments', 'attachment')
      .where('ticket.id=:id', { id })
      .getOne()

    if (ticket) {
      return ticket
    }

    return null
  }

  async loadAll(): Promise<LoadAllTicket.Output> {
    const ticketRepo = this.getRepository()

    const tickets = await ticketRepo
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.ratings', 'rating')
      .getMany()

    return tickets
  }
}
