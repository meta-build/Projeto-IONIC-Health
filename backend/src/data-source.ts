import { DataSource } from "typeorm";

//https://orkhan.gitbook.io/typeorm/docs/data-source-options
const AppDataSource = new DataSource({
    database: 'bdatividade', // se for SQLite, então use bdaula.db
    type: "mysql", // se for SQLite, então use sqlite
    host: 'localhost', // não use esta propriedade se for sqlite
    port: 3306, // não use esta propriedade se for sqlite
    username: 'root', // não use esta propriedade se for sqlite
    password:'asterisk', // não use esta propriedade se for sqlite
    // true indica que o schema do BD será criado a cada vez que a aplicação inicializar
    // deixe false ao usar migrations
    synchronize: true, 
    logging: false, // true indica que as consultas e erros serão exibidas no terminal
    entities: ["src/entities/*.ts"], // entidades que serão convertidas em tabelas
    migrations: ["src/migrations/*.ts"], // local onde estarão os arquivos de migração
    subscribers: [],
    maxQueryExecutionTime: 2000 // 2 seg.
});

// https://orkhan.gitbook.io/typeorm/docs/data-source
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    });

export default AppDataSource;