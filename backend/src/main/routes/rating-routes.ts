import { makeCreateRatingController } from '@/main/factories/application/controllers'
import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/rating', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateRatingController()))
}
