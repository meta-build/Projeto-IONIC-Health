import {
    CreateTicket,
    LoadTicketById
  } from '@/domain/contracts/repos/ticket'
  import { Ticket } from './entities'
  import DataSource from './data-source'
  
  import { ObjectType, Repository } from 'typeorm'
  
  export class TicketRepository
    implements CreateTicket, LoadTicketById
  {
    getRepository(entity: ObjectType<Ticket>): Repository<Ticket> {
      return DataSource.getRepository(entity)
    }
  
    async create({
        title,
        type,
        description,
        status
    }: CreateTicket.Input): Promise<CreateTicket.Output> {
      const ticketRepo = this.getRepository(Ticket)
      const ticket = ticketRepo.create({
        title,
        type,
        description,
        status
      })
  
      await ticketRepo.save(ticket)
  
      return {
        id: ticket.id,
        title: ticket.title,
        type: ticket.type,
        description: ticket.description,
        status: ticket.status
      }
    }
  
    async loadById({ id }: LoadTicketById.Input): Promise<LoadTicketById.Output> {
      const ticketRepo = this.getRepository(Ticket)
  
      const ticket = await ticketRepo.findOneBy({ id })
  
      if (ticket) {
        return ticket
      }
  
      return null
    }
  }
  