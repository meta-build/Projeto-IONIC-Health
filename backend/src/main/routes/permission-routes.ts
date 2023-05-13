import {
  makeCreatePermissionFactory,
  makeGetAllPermissionFactory
} from '@/main/factories/application/controllers/'
import { makeAuthMiddleware } from '@/main/factories/middlewares'
import { adaptMiddleware, adaptRoute } from '@/main/adapters'

import { Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/permission',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeCreatePermissionFactory())
  )
  router.get(
    '/permission',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeGetAllPermissionFactory())
  )
}
