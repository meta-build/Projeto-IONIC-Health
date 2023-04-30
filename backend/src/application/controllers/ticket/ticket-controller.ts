import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { User, Ticket } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from "express";

export class TicketController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { titulo, tipo, descricao, status } = req.body;
    const id = parseInt(req.params.id);

    const id_usuario_token = res.locals

    if (!id) {
      return res.json({ error: "Identificação e criador são necessários" });
    }

    const ticket: any = await AppDataSource.manager
      .findOneByOrFail(Ticket, { id })
      .catch(() => {
        return { error: `Solicitação com ${id} não encontrado` };
      });

    const user_repository = await AppDataSource.manager.getRepository(User)
    const query_user = await user_repository.findOneOrFail({ where: { id: id_usuario_token.id }, relations: ['grupo'] });

    if (query_user.role.name === "ADMIN") {
      if (ticket?.id) {
        ticket.title = titulo;
        ticket.type = tipo;
        ticket.description = descricao;
        ticket.status = status
        if (ticket.status?.toUpperCase() === "ARCHIVED") {
          ticket.archivedAt = new Date()
        }

        if (!status) {
          ticket.updatedAt = new Date()
        }

        const r = await AppDataSource.manager
          .save(Ticket, ticket)
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
