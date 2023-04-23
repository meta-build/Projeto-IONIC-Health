import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Grupo } from "../entities/Grupo";

class GrupoController {
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
      const grupo = new Grupo();
      grupo.name = name;
      await AppDataSource.manager.save(Grupo, grupo);
      res.json({
        id: grupo.id,
        name: grupo.name,
      });
    } else {
      return res.json(usuario);
    }
  }
}
export default new GrupoController();
