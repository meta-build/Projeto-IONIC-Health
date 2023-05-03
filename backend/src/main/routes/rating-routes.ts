import { makeCreateRatingController } from '@/main/factories/application/controllers'
import { adaptRoute } from '@/main/adapters'
import { authorization } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/rating', authorization, adaptRoute(makeCreateRatingController()))
}
