import { RequestHandler } from 'express'
import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().single('file')

  upload(req, res, error => {
    if (error !== undefined) {
      return res.status(500).json({ error: error.message })
    }

    if (req.file !== undefined) {
      req.fileData = {
        buffer: req.file.buffer,
        mimeType: req.file.mimetype,
        fileName: req.file.originalname
      }
    }

    next()
  })
}
