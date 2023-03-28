import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { User } from '../entities/User';
import { generateToken } from '../middlewares';

class UserController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { nomeSolicitacao, tipoSolicitacao, solicitante } = req.body;
    //verifica se foram fornecidos os parâmetros
    if ( !nomeSolicitacao || !tipoSolicitacao || !solicitante) {
      return res.json({ error: "nome e tipo da solicitação obrigatórios!" });
    }
    // como a propriedade password não está disponível para select {select: false},
    // então precisamos usar esta consulta para forçar incluir a propriedade 
    const usuario: any = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select()
      .addSelect('user.nomeSolicitacao')
      .addSelect('user.tipoSolicitacao')
      .addSelect('user.solicitante')
      .where("user.nomeSolicitacao=:nomeSolicitacao", { nomeSolicitacao })
      .getOne();

    if (usuario && usuario.idSolicitacao) {
      const r = await usuario.compare(nomeSolicitacao);
      if (r) {
        // cria um token codificando o objeto {id,nomesolicitacao}
        const token = await generateToken({ id: usuario.idSolicitacao, nomeSolicitacao: usuario.nomeSolicitacao });
        // retorna o token para o cliente
        return res.json({
          id: usuario.idSolicitacao,
          nomeSolicitacao: usuario.nomeSolicitacao
        });
      }
      return res.json({ error: "Dados não conferem" });
    }
    else {
      return res.json({ error: "Solicitação não localizada" });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, tipo, solicitante } = req.body;
    console.log(req.body)
    //verifica se foram fornecidos os parâmetros
    const obj = new User();
    obj.nomeSolicitacao = nome;
    obj.tipoSolicitacao = tipo;
    obj.solicitante = solicitante;

    console.log(obj)

    // o hook BeforeInsert não é disparado com AppDataSource.manager.save(User,JSON),
    // mas é disparado com AppDataSource.manager.save(User,objeto do tipo User)
    // https://github.com/typeorm/typeorm/issues/5493
    const usuario: any = await AppDataSource.manager.save(User, obj).catch((e) => {
      // testa se o e-mail é repetido
      if (/(nomeSolicitante)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'solicitação já existe' };
      }
      return { error: e.message };
    })
    if (usuario.idSolicitacao) {
      // cria um token codificando o objeto {idusuario,mail}
      const token = await generateToken({ id: usuario.idSolicitacao, nome: usuario.nomeSolicitacao, tipo: usuario.tipoSolicitacao, solicitante: usuario.solicitante });
      // retorna o token para o cliente
      return res.json({
        id: usuario.idSolicitacao,
        nome: usuario.nomeSolicitacao,
        tipoSolicitacao: usuario.tipoSolicitacao,
        solicitante: usuario.solicitante
      });
    }
    return res.json(usuario);
  }

  // o usuário pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const { idSolicitacao, mail, password, nomeSolicitacao, tipoSolicitacao } = req.body;
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;
    const usuario: any = await AppDataSource.manager.findOneBy(User, { idSolicitacao }).catch((e) => {
      return { error: "Identificador inválido" };
    })
    if (usuario && usuario.idSolicitacao) {
      if (mail !== "") {
        usuario.mail = mail;
      }
      if (password !== "") {
        usuario.password = password;
      }

      const r = await AppDataSource.manager.save(User, usuario).catch((e) => {
        // testa se o e-mail é repetido
        if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
          return ({ error: 'e-mail já existe' });
        }
        return e;
      })
      if (!r.error) {
        return res.json({ id: usuario.id, mail: usuario.mail, nome: usuario.nomeSolicitacao, tipo: usuario.tipoSolicitacao });
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