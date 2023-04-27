import {ArchiveSolicitacao, SolicitacaoController, DeleteSolicitacao, GetAllSolicitacao, GetOneSolicitacao} from '../../application/controllers'
import { authorization } from '../../middlewares'
import { adaptRoute } from '../adapters/express-router'
import { adaptMulter as upload } from '../adapters/multer'
import { makeTicketController } from '../factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/ticket', authorization, upload, adaptRoute(makeTicketController()))
  router.put('/ticket/:id', authorization, new SolicitacaoController().update)
  router.get('/ticket/:id', new GetOneSolicitacao().getSolicitacaoById)
  router.get('/ticket', new GetAllSolicitacao().getAllSolicitacao)
  router.delete('/ticket/:id', new DeleteSolicitacao().deleteSolicitacao)
}

