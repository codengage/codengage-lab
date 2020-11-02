import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

export const setupMiddlewares = (app: Koa): void => {
  app.use(cors())
  app.use(bodyParser())
}
