import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { generateToken } from '../middlewares';

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { mail, password } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!mail || !password || mail.trim() === "" || password.trim() === "") {
      return res.json({ error: "e-mail e senha necessários" });
    }

    const usuario: any = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.password')
      .where("user.mail=:mail", { mail })
      .getOne();

    if (usuario && usuario.id) {
      // cria um token codificando o objeto {id,mail}
      const token = await generateToken({ id: usuario.id, mail: usuario.mail });
      // retorna o token para o cliente
      return res.json({
        id: usuario.id,
        grupoId: usuario.grupoId,
        mail: usuario.mail,
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
      .leftJoinAndSelect("usuario.grupo", "grupo")
      .where("usuario.id=:id", { id })
      .getOne();

    if (!usuario) {
      return res
        .status(404)
        .send("Usuário Não encontrado na Base de Dados.");
    }

    return res.send(usuario);
  }

  public async getAllUser(req: Request, res: Response) {
    const solicitacao: any = await AppDataSource.getRepository(
      User
    ).find();
    res.send(solicitacao);
    return solicitacao;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { mail, password, name, grupoId } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!mail || !password || mail.trim() === "" || password.trim() === "") {
      return res.json({ error: "e-mail e senha necessários" });
    }
    const obj = new User();
    obj.mail = mail;
    obj.password = password;
    obj.name = name
    obj.grupoId = grupoId
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
      const token = await generateToken({ id: usuario.id, mail: usuario.mail, name: usuario.name, id_grupo: usuario.grupoId });
      // retorna o token para o cliente
      return res.json({
        id: usuario.id,
        mail: usuario.mail,
        name: usuario.name,
        id_grupo: usuario.grupoId,
        token
      });
    }
    return res.json(usuario);
  }

  // o usuário pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const { mail, password, name, grupoId } = req.body;
    const id_usuario = parseInt(req.params.id)
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;

    const usuario: any = await AppDataSource.manager.findOneByOrFail(User, { id: id_usuario })

    const user_repository = await AppDataSource.manager.getRepository(User)
    const query_user = await user_repository
      .createQueryBuilder("usuario")
      .leftJoinAndSelect("usuario.grupo", "grupo")
      .where("usuario.id=:id", { id })
      .getOne();

    // if (query_user.grupo.name === "ADMIN") {
    if (true) {
      if (usuario && usuario.id) {
        usuario.name = name;
        usuario.mail = mail;
        usuario.password = password;
        usuario.grupoId = grupoId

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