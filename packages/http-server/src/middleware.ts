import { HttpRequest, HttpResponse } from './http'

export type Middleware = (httpRequest: HttpRequest) => Promise<HttpResponse>

export type MiddlewareFactory<Ports> = (ports: Ports) => Middleware
