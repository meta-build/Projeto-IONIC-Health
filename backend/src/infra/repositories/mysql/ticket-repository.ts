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
    archivedAt,
    assignedRoleId,
    statusNewAt,
    statusOnHoldingAt,
    statusDoneAt,
    statusRatingAt
  }: UpdateTicket.Input): Promise<UpdateTicket.Output> {
    const ticketRepo = this.getRepository()

    const ticket = await ticketRepo.findOneBy({ id })

    if (!ticket) {
      return null
    }

    ticket.title = title ?? ticket.title
    ticket.description = description ?? ticket.description
    ticket.status = status?.toUpperCase() ?? ticket.status
    ticket.updatedAt = new Date()
    ticket.archivedAt = archivedAt ?? ticket.archivedAt
    ticket.assignedRoleId = assignedRoleId ?? ticket.assignedRoleId
    ticket.statusNewAt = statusNewAt ?? ticket.statusNewAt
    ticket.statusOnHoldingAt = statusOnHoldingAt
    ticket.statusDoneAt = statusDoneAt
    ticket.statusRatingAt = statusRatingAt ?? ticket.statusRatingAt

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
      .leftJoinAndSelect('rating.user', 'ratingUser')
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
