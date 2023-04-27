import { DataSource } from 'typeorm'
import env from '../../../main/config/env'

const AppDataSource = new DataSource({
    type: 'mysql',
    database: env.database,
    host: env.dbHost,
    port: env.dbPort,
    username: env.dbUser,
    password: env.dbPassword,
    synchronize: true,
    logging: false,
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
    maxQueryExecutionTime: 2000
})

export default AppDataSource;
