import env from './config/env'
import AppDataSource from '../infra/repositories/mysql/data-source'


AppDataSource.initialize()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
