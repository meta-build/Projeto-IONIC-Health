import * as dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'jwtUwU==',
  database: process.env.DB_DATABASE ?? 'db_ionic',
  dbPort: parseInt(process.env.DB_PORT) ?? 3306,
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbUser: process.env.DB_USER ?? 'mysql',
  dbPassword: process.env.DB_PASSWORD ?? 'password',
  dbSsl: process.env.DB_SSL ?? 'None',
  mailHost: process.env.MAIL_HOST ?? 'smtp.example.com',
  mailUser: process.env.USER_MAIL ?? 'email@example.com',
  mailUserPw: process.env.USER_PW_MAIL ?? 'user_pw',
  mailPw: process.env.PW_MAIL ?? 'mail_password'
}
