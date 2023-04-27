import { authorization } from '../../middlewares'
import { GrupoController } from '../../application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/group', authorization, new GrupoController().create)
}
