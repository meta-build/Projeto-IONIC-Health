import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Solicitacao } from "../entities/Solicitacao";

class GetOneSolicitacao {
  public async getSolicitacaoById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const usuario: any = await AppDataSource.getRepository(Solicitacao)
      .createQueryBuilder("solicitacao")
      .select()
      .where("solicitacao.id=:id", { id })
      .getOne();

    if (!usuario) {
      return res
        .status(404)
        .send("Solicitação Não encontrada na Base de Dados.");
    }

    return res.send(usuario);
  }
}

export default new GetOneSolicitacao();
