import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { Ticket } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from "express"

export class GetOneTicket {
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
