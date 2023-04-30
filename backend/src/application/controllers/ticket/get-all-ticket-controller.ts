import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { Ticket } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from "express"

export class GetAllTicket {
  public async getAllTicket(req: Request, res: Response) {
    const ticket: any = await AppDataSource.getRepository(Ticket)
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.ratings', 'rating')
      .getMany()

    res.send(ticket);
  }
}
