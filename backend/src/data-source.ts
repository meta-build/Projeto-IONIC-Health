import { DataSource } from "typeorm";
import env from './main/config/env';

//https://orkhan.gitbook.io/typeorm/docs/data-source-options
const AppDataSource = new DataSource({
    type: 'mysql', // se for SQLite, então use sqlite
    database: env.database, // se for SQLite, então use bdaula.db
    host: env.dbHost, // não use esta propriedade se for sqlite
    port: env.dbPort, // não use esta propriedade se for sqlite
    username: env.dbUser, // não use esta propriedade se for sqlite
    password: env.dbPassword, // não use esta propriedade se for sqlite
    // true indica que o schema do BD será criado a cada vez que a aplicação inicializar
    // deixe false ao usar migrations
    synchronize: true,
    logging: false, // true indica que as consultas e erros serão exibidas no terminal
    entities: ['src/entities/*.ts'], // entidades que serão convertidas em tabelas
    migrations: ['src/migrations/*.ts'], // local onde estarão os arquivos de migração
    subscribers: [],
    maxQueryExecutionTime: 2000 // 2 seg.
});

// https://orkhan.gitbook.io/typeorm/docs/data-source
AppDataSource
    .initialize()
    .then(() => {
        console.log('Data Source inicializado!')
    })
    .catch((e) => {
        console.error('Erro na inicialização do Data Source:', e)
    });

export default AppDataSource;
