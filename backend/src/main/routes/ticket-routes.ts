import { TicketController, DeleteTicket, GetAllTicket, GetOneTicket } from '../../application/controllers'
import { authorization } from '../../middlewares'
import { adaptRoute } from '../adapters/express-router'
import { adaptMulter as upload } from '../adapters/multer'
import { makeTicketController } from '../factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/ticket', authorization, upload, adaptRoute(makeTicketController()))
  router.put('/ticket/:id', authorization, new TicketController().update)
  router.get('/ticket/:id', new GetOneTicket().getTicketById)
  router.get('/ticket', new GetAllTicket().getAllTicket)
  router.delete('/ticket/:id', new DeleteTicket().deleteTicket)
}

