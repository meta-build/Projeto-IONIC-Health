import { Router, Request, Response } from "express";
import user from "./user";
import UserController from "../controllers/UserController";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import GetAllSolicitacao from "../services/GetAllSolicitacao";
import ArchiveSolicitacao from "../services/ArchiveSolicitacao";
import deleteSolicitacao from "../services/deleteSolicitacao";
import SolicitacaoController from "../controllers/SolicitacaoController";

const routes = Router();

routes.use("/usuario", user);
// routes.use("/gasto", authorization, spent);
// routes.post("/login", UserController.login);
// routes.post("/create", UserController.create);
// routes.put("/update/:id", UserController.update)

routes.post("/create", SolicitacaoController.create);
routes.put("/update/:id", SolicitacaoController.update);

routes.get("/solicitacao/:id", GetOneSolicitacao.getSolicitacaoById);
routes.get("/all", GetAllSolicitacao.getAllSolicitacao);
routes.put("/arquivo/:id", ArchiveSolicitacao.archiveSolicitacao);
routes.delete("/delete/:id", deleteSolicitacao.deleteSolicitacao);

export default routes;
