import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Solicitacao } from "../entities/Solicitacao";

class deleteSolicitacao {
  public async deleteSolicitacao(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const solicitacao: any = await AppDataSource.getRepository(
      Solicitacao
    ).delete(id);
    if (!res.status(200)) {
      return res.status(404).send("Não foi possível deletar!");
    }
    return res.status(200).send("Deletado com Sucesso!");
  }
}

export default new deleteSolicitacao();
