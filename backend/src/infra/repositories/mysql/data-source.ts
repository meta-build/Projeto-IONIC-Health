import { DataSource } from 'typeorm'
import env from '../../../main/config/env'

// const AppDataSource = new DataSource({
//     type: 'mysql',
//     database: env.database,
//     host: env.dbHost,
//     port: env.dbPort,
//     username: env.dbUser,
//     password: env.dbPassword,
//     synchronize: false,
//     logging: false,
//     entities: [__dirname + '/entities/*.ts'],
//     migrations: [__dirname + '/migrations/*.ts'],
//     subscribers: [],
//     maxQueryExecutionTime: 2000
// })

const AppDataSource = new DataSource({
    type: 'mysql',
    database: env.database,
    host: env.dbHost,
    port: env.dbPort,
    username: env.dbUser,
    password: env.dbPassword,
    synchronize: false,
    logging: false,
    entities: [__dirname + '/entities/*.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
    subscribers: [],
    maxQueryExecutionTime: 2000,
    extra: {  
        ssl: {
            ca: env.dbSsl, // substitua pelo caminho do arquivo CA SSL
            rejectUnauthorized: false // define se deve rejeitar certificados SSL não autorizados (ajuste conforme necessário)
          }
      }
  });


export default AppDataSource;
