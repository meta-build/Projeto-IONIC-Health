import { Router, Request, Response } from "express";
import user from './user';
import UserController from "../controllers/UserController";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import GetAllSolicitacao from "../services/GetAllSolicitacao";
import ArchiveSolicitacao from "../services/ArchiveSolicitacao";

const routes = Router();

routes.use("/usuario", user);
// routes.use("/gasto", authorization, spent);
routes.post("/login", UserController.login);
routes.post("/create", UserController.create);
routes.put("/update/:id", UserController.update)

routes.get("/solicitacao/:id", GetOneSolicitacao.getSolicitacaoById)
routes.get("/all", GetAllSolicitacao.getAllSolicitacao)
routes.put("/arquivo/:id", ArchiveSolicitacao.archiveSolicitacao)

export default routes;
