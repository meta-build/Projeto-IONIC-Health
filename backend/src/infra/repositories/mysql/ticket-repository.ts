import { LoadTicketById } from '@/domain/contracts/repos/ticket'
import { Ticket } from './entities'
import DataSource from './data-source'

import { ObjectType, Repository } from 'typeorm'

export class TicketRepository implements LoadTicketById {
  getRepository(entity: ObjectType<Ticket>): Repository<Ticket> {
    return DataSource.getRepository(entity)
  }

  async loadById({
    id
  }: LoadTicketById.Input): Promise<LoadTicketById.Output> {
    const ticketRepo = this.getRepository(Ticket)

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
}
