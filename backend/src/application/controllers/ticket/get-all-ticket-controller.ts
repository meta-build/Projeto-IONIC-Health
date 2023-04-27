import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { Solicitacao } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from "express"

export class GetAllSolicitacao {
  public async getAllSolicitacao(req: Request, res: Response) {
    const ticket: any = await AppDataSource.getRepository(Solicitacao)
      .createQueryBuilder('solicitacao')
      .leftJoinAndSelect('solicitacao.ratings', 'rating')
      .getMany()

    res.send(ticket);
  }
}
