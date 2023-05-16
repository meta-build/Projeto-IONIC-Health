import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { makeCreateRoleFactory, makeGetAllRoleController, makeUpdateRoleFactory } from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/role', adaptMiddleware(makeAuthMiddleware(['CreateRole'])), adaptRoute(makeCreateRoleFactory()))
  router.put('/role/:id', adaptMiddleware(makeAuthMiddleware(['UpdateRole'])), adaptRoute(makeUpdateRoleFactory()))
  router.get('/role', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetAllRoleController()))
}
