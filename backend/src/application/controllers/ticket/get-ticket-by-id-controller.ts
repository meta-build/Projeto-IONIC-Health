import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { Ticket } from '../../../infra/repositories/mysql/entities'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository';

import { Request, Response } from "express"
import { Controller } from '../controller';
import { HttpResponse, badRequest, ok } from '@/application/helpers';

type HttpRequest = {
  params: any
}

export class GetTicketByIdController implements Controller {
  constructor(
    private readonly ticketRepository: TicketRepository
  ) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.params.id
    const ticket = await this.ticketRepository.loadById({id})
    if (!ticket){
      return badRequest(new Error())
    }
    return ok(ticket)
  }

  public async getTicketById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const ticket: any = await AppDataSource.getRepository(Ticket)
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.ratings', 'rating')
      .leftJoinAndSelect('ticket.attachments', 'attachment')
      .where("ticket.id=:id", { id })
      .getOne();

    if (!ticket) {
      return res
        .status(404)
        .send("Solicitação Não encontrada na Base de Dados.");
    }

    return res.send(ticket);
  }
}
