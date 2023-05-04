import { HttpResponse } from '@/application/helpers'

export interface Controller {
  handle: (httpRequest: any) => Promise<HttpResponse>
}
