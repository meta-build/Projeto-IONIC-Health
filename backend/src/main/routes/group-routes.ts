import { authorization } from '@/main/middlewares'
import { GroupController } from '@/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/group', authorization, new GroupController().create)
}
