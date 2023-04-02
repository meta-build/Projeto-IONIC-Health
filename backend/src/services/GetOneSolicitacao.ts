import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import { User } from '../entities/User';

class GetOneSolicitacao {

public async getSolicitacaoById(req: Request, res: Response) { 
    
    const id = parseInt(req.params.id)
    const usuario: any = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .select()
        .where("user.id=:id", { id })
        .getOne();

    if (!usuario) {
      return res.status(404).send("Não encontrado.");
    }
  
    return res.send(usuario);
   
  }
}



export default new GetOneSolicitacao();
