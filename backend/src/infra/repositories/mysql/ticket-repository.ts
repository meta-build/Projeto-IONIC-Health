import { Ticket } from './entities'
import DataSource from './data-source'
import {
  LoadTicketByReqId
} from '@/domain/contracts/repos/ticket'

import { ObjectType, Repository } from 'typeorm'

export class TicketRepository implements LoadTicketByReqId {
  getRepository(entity: ObjectType<Ticket>): Repository<Ticket> {
    return DataSource.getRepository(entity)
  }

  async loadTicketById({
    id
  }: LoadTicketByReqId.Input): Promise<LoadTicketByReqId.Output> {
    const ticketRepo = this.getRepository(Ticket)

    const ticket = await ticketRepo.findOneBy({ id })

    if (ticket) {
      return ticket
    }

    return null
  }
}

