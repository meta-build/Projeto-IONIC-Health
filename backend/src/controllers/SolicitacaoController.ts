import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Solicitacao } from "../entities/Solicitacao";

class SolicitacaoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, tipo, solicitante, verificaSolicitacao } = req.body;
    console.log(req.body);
    //verifica se foram fornecidos os parâmetros
    const obj = new Solicitacao();
    obj.nomeSolicitacao = nome;
    obj.tipoSolicitacao = tipo;
    obj.solicitante = solicitante;
    obj.verificaSolicitacao = verificaSolicitacao;

    console.log(obj);

    const solicitacao: any = await AppDataSource.manager.save(Solicitacao, obj);
    return res.json({
      id: solicitacao.idSolicitacao,
      nome: solicitacao.nomeSolicitacao,
      tipoSolicitacao: solicitacao.tipoSolicitacao,
      solicitante: solicitacao.solicitante,
      verificaSolicitacao: solicitacao.verificaSolicitacao,
    });
  }

  // a solciitação pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const {
      nomeSolicitacao,
      tipoSolicitacao,
      solicitante,
      verificaSolicitacao,
    } = req.body;

    const solicitacao: any = await AppDataSource.getRepository(
      Solicitacao
    ).findOne({ where: { id: id } });

    if (!solicitacao) {
      return res.status(404).send({ error: "Solicitação não encontrada." });
    }

    (solicitacao.nomeSolicitacao = nomeSolicitacao),
      (solicitacao.tipoSolicitacao = tipoSolicitacao),
      (solicitacao.solicitante = solicitante),
      (solicitacao.verificaSolicitacao = verificaSolicitacao);

    const r = await AppDataSource.manager.save(solicitacao);
    return res.status(200).send(r);
  }
}

export default new SolicitacaoController();
