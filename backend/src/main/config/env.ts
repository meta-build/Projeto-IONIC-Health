import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  database: process.env.DB_DATABASE ?? 'db_ionic',
  dbPort: parseInt(process.env.DB_PORT) ?? 3306,
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbUser: process.env.DB_USER ?? 'mysql',
  dbPassword: process.env.DB_PASSWORD ?? 'password'
}
