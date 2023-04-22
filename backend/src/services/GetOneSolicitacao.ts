import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Solicitacao } from "../entities/Solicitacao";

class GetOneSolicitacao {
  public async getSolicitacaoById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const ticket: any = await AppDataSource.getRepository(Solicitacao)
      .createQueryBuilder('solicitacao')
      .leftJoinAndSelect('solicitacao.ratings', 'rating')
      .leftJoinAndSelect('solicitacao.attachments', 'attachment')
      .where("solicitacao.id=:id", { id })
      .getOne();

    if (!ticket) {
      return res
        .status(404)
        .send("Solicitação Não encontrada na Base de Dados.");
    }

    return res.send(ticket);
  }
}

export default new GetOneSolicitacao();
