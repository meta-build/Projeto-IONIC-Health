import {
  DeleteTicket,
  GetAllTicket
} from '@/application/controllers'
import { authorization } from '@/main/middlewares'
import { TicketController } from '@/application/controllers'
import { adaptMiddleware, adaptRoute, adaptMulter as upload } from '../adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'


import { Router } from "express"
import { makeTicketController } from '../factories/application/controllers'
import { makeGetTicketById } from '../factories/application/controllers/ticket/get-ticket-by-id-controller-factory'

export default (router: Router): void => {
  router.post(
    '/ticket',
    authorization,
    upload,
    adaptRoute(makeTicketController())
  )
  router.put('/ticket/:id', authorization, new TicketController().update)
  router.get('/ticket/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetTicketById()))
  router.get('/ticket', new GetAllTicket().getAllTicket)
  router.delete('/ticket/:id', new DeleteTicket().deleteTicket)
}
