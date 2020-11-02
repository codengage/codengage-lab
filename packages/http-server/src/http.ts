export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest = {
  body?: any
  params?: any
  headers?: any
  payload?: any
}
