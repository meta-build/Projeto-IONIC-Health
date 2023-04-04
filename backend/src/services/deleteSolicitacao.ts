import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";

class deleteSolicitacao {
  public async deleteSolicitacao(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const solicitacao: any = await AppDataSource
    .getRepository(User)
    .delete(id)
    res.status(200).send(solicitacao)
  }
}

export default new deleteSolicitacao();
