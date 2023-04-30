import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { Ticket } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from "express"

export class DeleteTicket {
  public async deleteTicket(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await AppDataSource.getRepository(
      Ticket
    ).delete(id);
    if (!res.status(200)) {
      return res.status(404).send("Não foi possível deletar!");
    }
    return res.status(200).send("Deletado com Sucesso!");
  }
}
