import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import { User } from '../entities/User';

class GetAllSolicitacao {

public async getAllSolicitacao(req: Request, res: Response) { 
    const { nomeSolicitacao, tipoSolicitacao, solicitante } = req.params;
    return res.json
   
  }
}



export default new GetAllSolicitacao();
