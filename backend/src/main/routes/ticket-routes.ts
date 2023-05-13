import { DeleteTicket } from '@/application/controllers'
import { authorization } from '@/main/middlewares'
import { adaptMiddleware, adaptRoute, adaptMulter as upload } from '@/main/adapters'
import { TicketController } from '@/application/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import {
  makeGetAllTicketController,
  makeTicketController,
  makeGetTicketById
} from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/ticket',
    adaptMiddleware(makeAuthMiddleware(['CreateTicket'])),
    upload,
    adaptRoute(makeTicketController())
  )
  router.put('/ticket/:id', authorization, new TicketController().update)
  router.get(
    '/ticket/:id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetTicketById())
  )
  router.get(
    '/ticket',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetAllTicketController())
  )
  router.delete('/ticket/:id', new DeleteTicket().deleteTicket)
}
