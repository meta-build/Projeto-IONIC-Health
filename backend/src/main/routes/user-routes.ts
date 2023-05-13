import {
  makeCreateUserController,
  makeLoginController,
  makeUpdateUserController,
  makeGetUserByIdController,
  makeGetAllUserController
} from '@/main/factories/application/controllers/'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware, adaptRoute } from '@/main/adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateUserController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.put(
    '/user/:id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeUpdateUserController())
  )
  router.get(
    '/user/:id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetUserByIdController())
  )
  router.get(
    '/user',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetAllUserController())
  )
}
