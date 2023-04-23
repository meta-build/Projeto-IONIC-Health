import { FileData } from '../../domain/entities'

import { RequestHandler } from 'express'
import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().array('attachments')

  upload(req, res, (error) => {
    if (error !== undefined) {
      return res.status(500).json({ error: error.message })
    }

    if (!req.fileDataList) {
      req.fileDataList = []
    }

    Array.isArray(req.files) &&
      req.files.forEach((file: Express.Multer.File) => {
        const fileData: FileData = {
          buffer: file.buffer,
          mimeType: file.mimetype,
          fileName: file.originalname
        }
        req.fileDataList.push(fileData)
      })

    next()
  })
}
