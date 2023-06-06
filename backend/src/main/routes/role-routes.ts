import { adaptMiddleware, adaptRoute } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateRoleController,
  makeDeleteRoleByIdController,
  makeGetAllRoleController,
  makeGetRoleByIdController,
  makeUpdateRoleController
} from '@/main/factories/application/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/role',
    adaptMiddleware(makeAuthMiddleware(['CreateRole'])),
    adaptRoute(makeCreateRoleController())
  )
  router.put(
    '/role/:id',
    adaptMiddleware(makeAuthMiddleware(['UpdateRole'], false)),
    adaptRoute(makeUpdateRoleController())
  )
  router.get(
    '/role/:id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetRoleByIdController())
  )
  router.get(
    '/role',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetAllRoleController())
  )
  router.delete(
    '/role/:id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeDeleteRoleByIdController())
  )
}
