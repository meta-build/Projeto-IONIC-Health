import { Router, Request, Response } from "express";
import user from "./user";
import grupo from "./grupo";
import notificacao from "./notificacao";
import UserController from "../controllers/UserController";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import GetAllSolicitacao from "../services/GetAllSolicitacao";
import ArchiveSolicitacao from "../services/ArchiveSolicitacao";
import deleteSolicitacao from "../services/deleteSolicitacao";
import SolicitacaoController from "../controllers/SolicitacaoController";
import { authorization } from "../middlewares";
import GrupoController from "../controllers/GrupoController";

const routes = Router();

routes.use("/usuario", user);
routes.post("/login", UserController.login);
routes.post("/create", UserController.create);
routes.put("/update/:id", UserController.update);

routes.use("/notificacao", authorization, notificacao);

routes.post("/create/solicitacao", authorization, SolicitacaoController.create);
routes.put("/update/solicitacao/:id", authorization, SolicitacaoController.update);

routes.get("/solicitacao/:id", GetOneSolicitacao.getSolicitacaoById);
routes.get("/all", GetAllSolicitacao.getAllSolicitacao);
routes.put("/arquivo/:id", ArchiveSolicitacao.archiveSolicitacao);
routes.delete("/delete/:id", deleteSolicitacao.deleteSolicitacao);

routes.use("/grupo", authorization, grupo);
routes.post("/create/grupo", authorization, GrupoController.create);

export default routes;
