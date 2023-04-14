import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Notificacao } from "../entities/Notificacao";
import { User } from "../entities/User";

class NotificacaoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { texto } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!texto || texto === "") {
      return res.json({ error: "O texto são necessários" });
    }
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;
    const usuario: any = await AppDataSource.manager
      .findOneBy(User, { id })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });

    if (usuario && usuario.id) {
      const notificacao = new Notificacao();
      notificacao.user = usuario;
      notificacao.texto = texto;
      await AppDataSource.manager.save(Notificacao, notificacao);
      res.json({ id: notificacao.id, texto: notificacao.texto });
    } else {
      return res.json(usuario);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, texto, value } = req.body;
    if (!id || id === "" || !texto || texto === "" || !value || value === "") {
      return res.json({ error: "Identificação e texto são necessários" });
    }
    const notificacao: any = await AppDataSource.manager
      .findOneBy(Notificacao, { id })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });
    if (notificacao && notificacao.id) {
      notificacao.texto = texto;
      notificacao.value = value;
      const r = await AppDataSource.manager
        .save(Notificacao, notificacao)
        .catch((e) => e.message);
      return res.json(r);
    } else if (notificacao && notificacao.error) {
      return res.json({ notificacao });
    } else {
      return res.json({ error: "Notificação não localizada" });
    }
  }

  // public async delete(req: Request, res: Response): Promise<Response> {
  //     const { id } = req.body;
  //     if (!id || id === "") {
  //         return res.json({ error: "Identificação necessária" });
  //     }
  //     const gasto: any = await AppDataSource.manager.findOneBy(Notificacao, { id }).catch((e) => {
  //         return { error: "Identificador inválido" };
  //     });

  //     if (gasto && gasto.id) {
  //         const r = await AppDataSource.manager.remove(Notificacao, gasto).catch((e) => e.message);
  //         return res.json(r);
  //     }
  //     else if (gasto && gasto.error) {
  //         return res.json(gasto);
  //     }
  //     else {
  //         return res.json({ error: "Gasto não localizado" });
  //     }
  // }

  // public async list(req: Request, res: Response): Promise<Response> {
  //     // obtém o id do usuário que foi salvo na autorização na middleware
  //     const { id } = res.locals;
  //     const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
  //         return { error: "Identificador inválido" };
  //     })

  //     if (usuario && usuario.id) {
  //         const repo = AppDataSource.getRepository(Notificacao);
  //         const notificacao = await repo.find({
  //             /*relations:{
  //                 user:true
  //             },*/
  //             where: { user: { id } },
  //             order: {
  //                 texto: 'asc'
  //             }
  //         });
  //         return res.json(notificacao);
  //     }
  //     else if (!usuario) {
  //         return res.json({ error: "Usuário não identificado" });
  //     }
  //     else {
  //         return res.json(usuario)
  //     }
  // }
}

export default new NotificacaoController();
