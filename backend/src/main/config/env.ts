export default {
  database: process.env.DB_DATABASE ?? 'bd_ionic',
  dbPort: parseInt(process.env.DB_PORT) ?? 3306,
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbUser: process.env.DB_USER ?? 'rodrigo', // Ideal trocar para um valor mais genérico
  dbPassword: process.env.DB_PASSWORD ?? 'fatec'
}
