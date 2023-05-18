import express, { Express, Router } from 'express'
import { readdirSync } from 'fs'
import mime from 'mime-types'
import path from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  const uploadsPath = path.join(__dirname, '../../../', 'uploads')
  app.use('/uploads', express.static(uploadsPath, {
    setHeaders: (res, path) => {
      const mimeType = mime.lookup(path)
      if (mimeType) {
        res.set('Content-Type', mimeType)
      }
    }
  }))
  app.use('/api', router)
  readdirSync(path.join(__dirname, '..', 'routes')).map(async file => {
    (await import(`../routes/${file}`)).default(router)
  })
}
