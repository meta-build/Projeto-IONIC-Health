import {
  adaptMiddleware,
  adaptRoute,
  adaptMulter as upload
} from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import {
  makeGetAllTicketController,
  makeTicketController,
  makeGetTicketById,
  makeUpdateTicketController,
  makeDeleteTicketByIdController
} from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/ticket',
    adaptMiddleware(makeAuthMiddleware(['CreateTicket'])),
    upload,
    adaptRoute(makeTicketController())
  )
  router.put(
    '/ticket/:id',
    adaptMiddleware(
      makeAuthMiddleware([
        'UpdateTicket',
        'ArchiveTicket',
        'ApproveTicketToProd',
        'ApproveTicketToRating',
        'UpdateTicketProd'
      ], false)
    ),
    adaptRoute(makeUpdateTicketController())
  )
  router.delete(
    '/ticket/:id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeDeleteTicketByIdController())
  )
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
}
