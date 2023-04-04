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
    const { nome, tipo, solicitante, verificaSolicitacao } = req.body;
    console.log(req.body)
    //verifica se foram fornecidos os parâmetros
    const obj = new User();
    obj.nomeSolicitacao = nome;
    obj.tipoSolicitacao = tipo;
    obj.solicitante = solicitante;
    obj.verificaSolicitacao = verificaSolicitacao

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
        solicitante: usuario.solicitante,
        verificaSolicitacao: usuario.verificaSolicitacao
      });
    }
    return res.json(usuario);
  }

  // a solciitação pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const { nomeSolicitacao, tipoSolicitacao, solicitante, verificaSolicitacao } = req.body;

    const solicitacao: any = await AppDataSource
    .getRepository(User)
    .findOneBy({id})

    if (!solicitacao) {
        return res.status(404).send({ error: 'Solicitação não encontrada.' });
      }
    
    solicitacao.nomeSolicitacao = nomeSolicitacao,
    solicitacao.tipoSolicitacao = tipoSolicitacao,
    solicitacao.solicitante = solicitante,
    solicitacao.verificaSolicitacao = verificaSolicitacao

    const r = await AppDataSource.manager.save(solicitacao)
    return res.status(200).send(r);

}

}

export default new UserController();