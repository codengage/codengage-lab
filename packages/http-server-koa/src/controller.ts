import Koa from 'koa'
import { Controller, HttpRequest } from '@codengage/http-server'

export const koaControllerAdapter = (controller: Controller) => async (ctx: Koa.Context) => {
  const httpRequest: HttpRequest = {
    body: ctx.request.body,
    params: ctx.request.query,
    headers: ctx.headers,
    payload: ctx.payload,
  }
  const httpResponse = await controller(httpRequest)
  ctx.status = httpResponse.statusCode
  ctx.body = httpResponse.body
}
