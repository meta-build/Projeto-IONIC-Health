import {
  LoadAllTicket,
  LoadTicketById,
  UpdateTicket
} from '@/domain/contracts/repos/ticket'
import { Ticket } from './entities'
import DataSource from './data-source'

import { Repository } from 'typeorm'

export class TicketRepository
  implements LoadTicketById, LoadAllTicket, UpdateTicket
{
  getRepository(): Repository<Ticket> {
    return DataSource.getRepository(Ticket)
  }

  async update({
    id,
    title,
    description,
    status,
    isArchived,
    updatedAt,
    archivedAt,
    assignedRoleId
  }: UpdateTicket.Input): Promise<UpdateTicket.Output> {
    const ticketRepo = this.getRepository()

    const ticket = await ticketRepo.findOneBy({ id })

    if (!ticket) {
      return null
    }

    ticket.title = title ?? ticket.title
    ticket.description = description ?? ticket.description
    ticket.status = status?.toUpperCase() ?? ticket.status
    ticket.updatedAt = updatedAt ?? ticket.updatedAt
    ticket.archivedAt = archivedAt ?? ticket.archivedAt
    ticket.assignedRoleId = assignedRoleId ?? ticket.assignedRoleId

    if (isArchived !== undefined) {
      ticket.isArchived = isArchived
    }

    const updatedTicket = await ticketRepo.save(ticket)

    return updatedTicket
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
