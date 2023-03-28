import * as express from "express";
import * as dotenv from 'dotenv';
dotenv.config();

import routes from './routes';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);