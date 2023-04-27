import { adaptRoute } from '../adapters/express-router'
import { makeCreateRatingController } from '../factories/application/controllers'
import { authorization } from '../../middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/rating', authorization, adaptRoute(makeCreateRatingController()))
}
