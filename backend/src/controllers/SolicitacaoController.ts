import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Solicitacao } from "../entities/Solicitacao";
import { User } from "../entities/User";

class SolicitacaoController {

  public async update(req: Request, res: Response): Promise<Response> {
    const { titulo, tipo, descricao, status } = req.body;
    const id = parseInt(req.params.id);

    const id_usuario_token = res.locals

    if (!id) {
      return res.json({ error: "Identificação e criador são necessários" });
    }
    const solicitacao: any = await AppDataSource.manager
      .findOneByOrFail(Solicitacao, { id })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });

    const user_repository = await AppDataSource.manager.getRepository(User)
    const query_user = await user_repository.findOneOrFail({ where: { id: id_usuario_token.id }, relations: ['grupo'] });
    console.log(query_user.grupo.name)

    if (query_user.grupo.name === "ADMIN") {
      if (solicitacao && solicitacao.id) {
        solicitacao.titulo = titulo;
        solicitacao.tipo = tipo;
        solicitacao.descricao = descricao;
        solicitacao.status = status
        if (solicitacao.status?.toUpperCase() === "ARCHIVED") {
          solicitacao.data_arquivado = new Date()
        }

        if (!status) {
          solicitacao.data_edicao = new Date()
        }

        const r = await AppDataSource.manager
          .save(Solicitacao, solicitacao)
          .catch((e) => e.message);

        return res.json(r);
      }
    } else if (res.statusCode != 200) {
      return res.json({ msg: "Solicitação não localizada." });
    } else {
      return res.json({ msg: "Usuário não é ADMINISTRADOR" });
    }
  }
}

export default new SolicitacaoController();
