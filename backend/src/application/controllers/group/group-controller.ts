import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { User, Role } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from "express"

export class GroupController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!name || name === "") {
      return res.json({ error: "O Nome é obrigatório" });
    }
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;
    console.log(id);
    const usuario: any = await AppDataSource.manager
      .findOneBy(User, { id })
      .catch((e) => {
        return { error: "Identificador inválido" };
      });

    if (usuario && usuario.id) {
      const grupo = new Role();
      grupo.name = name;
      await AppDataSource.manager.save(Role, grupo);
      res.json({
        id: grupo.id,
        name: grupo.name,
      });
    } else {
      return res.json(usuario);
    }
  }
}
