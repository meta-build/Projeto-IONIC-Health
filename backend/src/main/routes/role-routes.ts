import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { makeCreateRoleController, makeGetAllRoleController, makeUpdateRoleController } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/role', adaptMiddleware(makeAuthMiddleware(['CreateRole'])), adaptRoute(makeCreateRoleController()))
  router.put('/role/:id', adaptMiddleware(makeAuthMiddleware(['UpdateRole'])), adaptRoute(makeUpdateRoleController()))
  router.get('/role', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetAllRoleController()))
}
