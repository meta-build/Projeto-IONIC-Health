import { Router, Request, Response } from "express";
import user from './user';
import UserController from "../controllers/UserController";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import GetAllSolicitacao from "../services/GetAllSolicitacao";

const routes = Router();

routes.use("/usuario", user);
// routes.use("/gasto", authorization, spent);
routes.post("/login", UserController.login);

routes.get("/solicitacao/:id", GetOneSolicitacao.getSolicitacaoById)
routes.get("/solicitacao", GetAllSolicitacao.getAllSolicitacao)

export default routes;
