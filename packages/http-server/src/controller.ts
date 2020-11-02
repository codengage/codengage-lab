import { HttpRequest, HttpResponse } from './http'

export type Controller = (httpRequest: HttpRequest) => Promise<HttpResponse>

export type ControllerFactory<Ports> = (ports: Ports) => Controller
