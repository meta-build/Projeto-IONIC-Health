import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Solicitacao } from "../entities/Solicitacao";
import { User } from "../entities/User";

class SolicitacaoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { titulo, tipo, descricao } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!titulo || titulo === "" || !tipo || tipo === "") {
      return res.json({ error: "O titulo e tipo são necessários" });
    }
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;
    const criador: any = await AppDataSource.manager
      .findOneBy(User, { id })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });

    if (criador && criador.id) {
      const solicitacao = new Solicitacao();
      solicitacao.criador = criador;
      solicitacao.titulo = titulo;
      solicitacao.tipo = tipo;
      solicitacao.descricao = descricao;
      await AppDataSource.manager.save(Solicitacao, solicitacao);
      res.json({
        id: solicitacao.id,
        titulo: solicitacao.titulo,
        tipo: solicitacao.tipo,
        criador: solicitacao.criador,
        descricao: solicitacao.descricao,
      });
    } else {
      return res.json(criador);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { titulo, tipo, criador, descricao } = req.body;
    const id = parseInt(req.params.id);
    if (!id || !titulo || titulo === "") {
      return res.json({ error: "Identificação e criador são necessários" });
    }
    const solicitacao: any = await AppDataSource.manager
      .findOneBy(Solicitacao, { id })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });
    const usuario: any = await AppDataSource.manager
      .findOneBy(User, { id: criador })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });


    if (solicitacao && solicitacao.id) {
      solicitacao.criador = criador;
      solicitacao.titulo = titulo;
      solicitacao.tipo = tipo;
      solicitacao.descricao = descricao;

      const r = await AppDataSource.manager
        .save(Solicitacao, solicitacao)
        .catch((e) => e.message);

      return res.json(r);
    } else if (solicitacao) {
      return res.json({ solicitacao });
    } else {
      return res.json({ error: "Solicitação não localizada" });
    }
  }
}

export default new SolicitacaoController();
