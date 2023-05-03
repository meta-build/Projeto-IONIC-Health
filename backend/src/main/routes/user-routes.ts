import userController from '@/application/controllers/user/user-controller'
import { authorization } from '@/main/middlewares'
import { makeCreateUserController, makeLoginController } from '@/main/factories/application/controllers/'
import { adaptRoute } from '../adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateUserController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/user', userController.create)
  router.put('/user/:id', authorization, userController.update)
  router.get('/user/:id', authorization, userController.getUserById)
  router.get('/user', authorization, userController.getAllUser)
  router.delete('/user/:id', authorization, userController.deleteUser)
}
