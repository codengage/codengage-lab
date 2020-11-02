import Koa from 'koa'

import { setupRoutes } from './setupRoutes'
import { setupMiddlewares } from './setupMiddleware'

const app = new Koa()

setupMiddlewares(app)
setupRoutes(app)

export default app
