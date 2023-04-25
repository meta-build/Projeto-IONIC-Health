import express from "express";
import path from 'path'
import * as dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

import routes from "./routes";

const uploadsPath = path.join(__dirname, '..', 'uploads')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use('/uploads', express.static(uploadsPath))
app.use(express.json());
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);
