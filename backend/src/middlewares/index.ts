import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

// cria um token usando os dados do usuário e chave armazenada na variável de ambiente JWT_SECRET
export const generateToken = async usuario => jwt.sign(usuario, process.env.JWT_SECRET);

// verifica se o usuário possui autorização
export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  // o token precisa ser enviado pelo cliente no header da requisição
  const authorization = req.headers.authorization;
  try {
    // autorização no formato Bearer token
    const [, token] = authorization.split(" ");
    // valida o token
    const decoded = <{ id: string, mail: string, name: string, id_grupo: any }>jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      res.status(401).send({ error: "Não autorizado" });
    }
    else {
      // passa os dados pelo res.locals para ser acessado nos controllers
      res.locals = { id: decoded.id };
    }
  } catch (error) {
    // o toke não é válido, a resposta com HTTP Method 401 (unauthorized)
    res.status(401).send({ error: "Não autorizado" });
    return;
  }
  return next(); //chama a próxima função
};
