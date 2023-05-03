import userController from '@/application/controllers/user/user-controller'
import { authorization } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login', userController.login)
  router.post('/user', userController.create)
  router.put('/user/:id', authorization, userController.update)
  router.get('/user/:id', authorization, userController.getUserById)
  router.get('/user', authorization, userController.getAllUser)
  router.delete('/user/:id', authorization, userController.deleteUser)
}
