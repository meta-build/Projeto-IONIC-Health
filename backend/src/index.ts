import * as express from "express";
import * as dotenv from 'dotenv';
import *  as x from 'cors'
dotenv.config();

import routes from './routes';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(x)
app.use(express.json());
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

const allowedOrigins = ['http://localhost:3000'];

const options: x.CorsOptions = {
  origin: allowedOrigins
};

app.use(x(options))

app.use(routes);