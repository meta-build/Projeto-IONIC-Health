import { Controller, GetTicketByIdController } from "@/application/controllers";
import { TicketRepository } from "@/infra/repositories/mysql/ticket-repository";

export const makeGetTicketById = (): Controller => {
    const ticketRepository = new TicketRepository()
    return new GetTicketByIdController(ticketRepository)
  }