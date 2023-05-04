import userController from '@/application/controllers/user/user-controller'
import { authorization } from '@/main/middlewares'
import { makeCreateUserController, makeLoginController } from '@/main/factories/application/controllers/'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware, adaptRoute } from '../adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateUserController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.put('/user/:id', authorization, userController.update)
  router.get('/user/:id', adaptMiddleware(makeAuthMiddleware()), userController.getUserById)
  router.get('/user', authorization, userController.getAllUser)
  router.delete('/user/:id', authorization, userController.deleteUser)
}
