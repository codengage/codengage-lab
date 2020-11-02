import Koa from 'koa'
import { Middleware, HttpRequest } from '@codengage/http-server'

export const koaMiddlewareAdapter = (middleware: Middleware) => async (ctx: Koa.Context, next: Koa.Next) => {
  const httpRequest: HttpRequest = {
    body: ctx.request.body,
    params: ctx.request.query,
    headers: ctx.headers,
  }
  const httpResponse = await middleware(httpRequest)
  if (httpResponse.statusCode === 200) {
    Object.assign(ctx, httpResponse.body)
    await next()
  } else {
    ctx.status = httpResponse.statusCode
    ctx.body = httpResponse.body
  }
}
