import {
  TicketController,
  DeleteTicket,
  GetAllTicket,
  GetOneTicket
} from '@/application/controllers'
import {
  adaptMiddleware,
  adaptRoute,
  adaptMulter as upload
} from '@/main/adapters'
import { authorization } from '@/main/middlewares'
import { makeTicketController } from '@/main/factories/application/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/ticket',
    adaptMiddleware(makeAuthMiddleware(['CreateTicket'])),
    upload,
    adaptRoute(makeTicketController())
  )
  router.put('/ticket/:id', authorization, new TicketController().update)
  router.get('/ticket/:id', new GetOneTicket().getTicketById)
  router.get('/ticket', new GetAllTicket().getAllTicket)
  router.delete('/ticket/:id', new DeleteTicket().deleteTicket)
}
