import express, { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  const uploadsPath = path.join(__dirname, '../../../', 'uploads')
  app.use('/uploads', express.static(uploadsPath))
  app.use('/api', router)
  readdirSync(path.join(__dirname, '..', 'routes')).map(async file => {
    (await import(`../routes/${file}`)).default(router)
  })
}
