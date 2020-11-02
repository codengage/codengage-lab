import Koa from 'koa'
import Router from '@koa/router'

import { koaControllerAdapter, koaMiddlewareAdapter } from '@codengage/http-server-koa'

import { authMiddlewareFactory } from './middlewares/auth_middleware_factory'
import { signInControllerFactory } from './controllers/sign_in_controller_factory'
import { createUserControllerFactory } from './controllers/create_user_controller_factory'
import { findAllUsersControllerFactory } from './controllers/find_all_users_controller_factory'

const authMiddleware = koaMiddlewareAdapter(authMiddlewareFactory())

export const setupRoutes = (app: Koa): void => {
  const router = new Router()
  app.use(router.routes()).use(router.allowedMethods())

  router.get('/users', authMiddleware, koaControllerAdapter(findAllUsersControllerFactory()))
  router.post('/users', koaControllerAdapter(createUserControllerFactory()))
  router.post('/signin', koaControllerAdapter(signInControllerFactory()))
}
