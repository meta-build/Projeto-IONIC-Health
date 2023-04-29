import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { User } from '../../../infra/repositories/mysql/entities'
import { generateToken } from '../../../middlewares'

import { Request, Response } from 'express'

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.json({ error: "e-mail e senha necessários" });
    }

    const usuario: any = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.password')
      .where("user.email=:email", { email })
      .getOne();

    if (usuario && usuario.id) {
      // cria um token codificando o objeto {id,mail}
      const token = await generateToken({ id: usuario.id, email: usuario.email });
      // retorna o token para o cliente
      return res.json({
        id: usuario.id,
        roleId: usuario.roleId,
        email: usuario.email,
        name: usuario.name,
        token
      });
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }

  public async getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const usuario: any = await AppDataSource.getRepository(User)
      .createQueryBuilder("usuario")
      .leftJoinAndSelect("usuario.role", "role")
      .where("usuario.id=:id", { id })
      .getOne();

    if (!usuario) {
      return res
        .status(404)
        .send("Usuário Não encontrado na Base de Dados.");
    }

    return res.send(usuario);
  }

  public async getAllUser(_req: Request, res: Response) {
    const users: any = await AppDataSource.getRepository(
      User
    ).find();
    res.send(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { mail, password, name, roleId } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!mail || !password || mail.trim() === "" || password.trim() === "") {
      return res.json({ error: "e-mail e senha necessários" });
    }
    const obj = new User();
    obj.email = mail;
    obj.password = password;
    obj.name = name
    obj.roleId = roleId
    // o hook BeforeInsert não é disparado com AppDataSource.manager.save(User,JSON),
    // mas é disparado com AppDataSource.manager.save(User,objeto do tipo User)
    // https://github.com/typeorm/typeorm/issues/5493
    const usuario: any = await AppDataSource.manager.save(User, obj).catch((e) => {
      // testa se o e-mail é repetido
      if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'e-mail já existe' };
      }
      return { error: e.message };
    })
    if (usuario.id) {
      // cria um token codificando o objeto {idusuario,mail}
      const token = await generateToken({ id: usuario.id, email: usuario.email, name: usuario.name, roleId: usuario.roleId });
      // retorna o token para o cliente
      return res.json({
        id: usuario.id,
        mail: usuario.email,
        name: usuario.name,
        roleId: usuario.roleId,
        token
      });
    }
    return res.json(usuario);
  }

  // o usuário pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const { email, password, name, roleId } = req.body;
    const id_usuario = parseInt(req.params.id)
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;

    const usuario: any = await AppDataSource.manager.findOneByOrFail(User, { id: id_usuario })

    const user_repository = await AppDataSource.manager.getRepository(User)
    const query_user = await user_repository
      .createQueryBuilder("usuario")
      .leftJoinAndSelect("usuario.role", "role")
      .where("usuario.id=:id", { id })
      .getOne();

    // if (query_user.grupo.name === "ADMIN") {
    if (true) {
      if (usuario && usuario.id) {
        usuario.name = name;
        usuario.email = email;
        usuario.password = password;
        usuario.roleId = roleId

        const r = await AppDataSource.manager
          .save(User, usuario)
          .catch((e) => e.message);

        return res.json(r);
      }
    } else if (res.statusCode != 200) {
      return res.json({ msg: "Usuário não localizado." });
    } else {
      return res.json({ msg: "Usuário não é ADMINISTRADOR" });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const user: any = await AppDataSource.getRepository(
      User
    ).delete(id);
    if (!res.status(200)) {
      return res.status(404).send("Não foi possível deletar!");
    }
    return res.status(200).send("Deletado com Sucesso!");
  }

}

export default new UserController();
