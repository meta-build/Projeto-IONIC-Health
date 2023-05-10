import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { makeCreateRoleFactory } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/role', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateRoleFactory()))
}
