import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import { User } from '../entities/User';

class GetAllSolicitacao {

public async getAllSolicitacao(req: Request, res: Response){
    const solicitacao: any = await AppDataSource
    .getRepository(User)
    .find()
    res.send(solicitacao)
    return solicitacao
}
    }
export default new GetAllSolicitacao();
