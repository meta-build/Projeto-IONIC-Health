import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Solicitacao } from "../entities/Solicitacao";

class GetAllSolicitacao {
  public async getAllSolicitacao(req: Request, res: Response) {
    const solicitacao: any = await AppDataSource.getRepository(
      Solicitacao
    ).find();
    res.send(solicitacao);
    return solicitacao;
  }
}
export default new GetAllSolicitacao();
