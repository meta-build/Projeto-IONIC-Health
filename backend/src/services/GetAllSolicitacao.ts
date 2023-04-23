import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Solicitacao } from "../entities/Solicitacao";

class GetAllSolicitacao {
  public async getAllSolicitacao(req: Request, res: Response) {
    const ticket: any = await AppDataSource.getRepository(Solicitacao)
      .createQueryBuilder('solicitacao')
      .leftJoinAndSelect('solicitacao.ratings', 'rating')
      .getMany()

    res.send(ticket);
  }
}
export default new GetAllSolicitacao();
