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
        mail: usuario.mail,
        token
      });
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { mail, password, name } = req.body;
    //verifica se foram fornecidos os parâmetros
    if (!mail || !password || mail.trim() === "" || password.trim() === "") {
      return res.json({ error: "e-mail e senha necessários" });
    }
    const obj = new User();
    obj.mail = mail;
    obj.password = password;
    obj.name = name
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
      const token = await generateToken({ id: usuario.id, mail: usuario.mail, name: usuario.name });
      // retorna o token para o cliente
      return res.json({
        id: usuario.id,
        mail: usuario.mail,
        name: usuario.name,
        token
      });
    }
    return res.json(usuario);
  }

  // o usuário pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const { mail, password, name } = req.body;
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;
    const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
      return { error: "Identificador inválido" };
    })
    if (usuario && usuario.id) {
      if (mail !== "") {
        usuario.mail = mail;
      }
      if (password !== "") {
        usuario.password = password;
      }
      if (name !== "") {
        usuario.name = name;
      }
      const r = await AppDataSource.manager.save(User, usuario).catch((e) => {
        // testa se o e-mail é repetido
        if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
          return ({ error: 'e-mail já existe' });
        }
        return e;
      })
      if (!r.error) {
        return res.json({ id: usuario.id, mail: usuario.mail, name: usuario.name });
      }
      return res.json(r);
    }
    else if (usuario && usuario.error) {
      return res.json(mail)
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }

}

export default new UserController();