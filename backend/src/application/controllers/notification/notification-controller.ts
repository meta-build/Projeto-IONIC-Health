import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { User, Notification } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from "express";

export class NotificationController {
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
      const notificacao = new Notification();
      notificacao.user = usuario;
      notificacao.text = texto;
      await AppDataSource.manager.save(Notification, notificacao);
      res.json({ id: notificacao.id, texto: notificacao.text });
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
      .findOneBy(Notification, { id })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });
    if (notificacao && notificacao.id) {
      notificacao.text = texto;
      const r = await AppDataSource.manager
        .save(Notification, notificacao)
        .catch((e) => e.message);
      return res.json(r);
    } else if (notificacao && notificacao.error) {
      return res.json({ notificacao });
    } else {
      return res.json({ error: "Notificação não localizada" });
    }
  }
}
