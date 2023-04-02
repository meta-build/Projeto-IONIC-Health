import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import { User } from '../entities/User';

class GetAllSolicitacao {

public async getAllSolicitacao(req: Request, res: Response){
    const usuario: any = await AppDataSource
    .getRepository(User)
    .find()
    console.log(usuario)
    return usuario
}
    }
export default new GetAllSolicitacao();
