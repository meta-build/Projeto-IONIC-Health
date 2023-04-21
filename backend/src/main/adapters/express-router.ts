import { Request, Response } from 'express'

export const adaptRoute = (controller: any) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req, res)
    return httpResponse
  }
}
