import userController from '../../application/controllers/user/user-controller'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login', userController.login)
}
