import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import { User } from '../entities/User';

class ArchiveSolicitacao {

public async archiveSolicitacao(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const arquivar = req.body.arquivar;

    const solicitacao: any = await AppDataSource
    .getRepository(User)
    .findOneBy({id})

    if (!solicitacao) {
        return res.status(404).send({ error: 'Solicitação não encontrada.' });
      }

    solicitacao.arquivar = arquivar 

    const r = await AppDataSource.manager.save(solicitacao)
    return res.status(200).send(r);

}
    }
export default new ArchiveSolicitacao();
