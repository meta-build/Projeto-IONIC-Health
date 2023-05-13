import { Controller } from '@/application/controllers'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    // O res.locals deverá ser removido ao fim da refatoração.
    const httpResponse = await controller.handle({ ...req.body, ...req.locals, ...res.locals, fileDataList: req.fileDataList, params: req.params })
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.data)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.data.message
      })
    }
  }
}
