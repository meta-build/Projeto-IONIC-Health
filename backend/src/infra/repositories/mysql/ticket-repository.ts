import { Ticket } from './entities'
import DataSource from './data-source'
import {
  CreateTicket,
  LoadTicketByReqId
} from '@/domain/contracts/repos/ticket'

import { ObjectType, Repository } from 'typeorm'

export class TicketRepository implements CreateTicket, LoadTicketByReqId {
  getRepository(entity: ObjectType<Ticket>): Repository<Ticket> {
    return DataSource.getRepository(entity)
  }

  async create({
    title,
    type,
    description
  }: CreateTicket.Input): Promise<CreateTicket.Output> {
    const ticketRepo = this.getRepository(Ticket)
    const ticket = ticketRepo.create({
      title,
      type,
      description
    })

    await ticketRepo.save(ticket)

    return {
      id: ticket.id,
      title: ticket.title,
      type: ticket.type,
      description: ticket.description
    }
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

