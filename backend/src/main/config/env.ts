import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'jwtUwU==',
  database: process.env.DB_DATABASE ?? 'crud',
  dbPort: parseInt(process.env.DB_PORT) ?? 3306,
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbUser: process.env.DB_USER ?? 'William',
  dbPassword: process.env.DB_PASSWORD ?? 'Will2819'
}
