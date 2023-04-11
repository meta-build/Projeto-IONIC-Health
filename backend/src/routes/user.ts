import { Router } from "express";
import UserController from "../controllers/UserController";
import { authorization } from "../middlewares";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import GetAllSolicitacao from "../services/GetAllSolicitacao";
import ArchiveSolicitacao from "../services/ArchiveSolicitacao";
import deleteSolicitacao from "../services/deleteSolicitacao";
import SolicitacaoController from "../controllers/SolicitacaoController";

const routes = Router();

routes.post("/create", SolicitacaoController.create);
routes.put("/update", SolicitacaoController.update);
routes.get("/solicitacao", GetOneSolicitacao.getSolicitacaoById);
routes.get("/all", GetAllSolicitacao.getAllSolicitacao);
routes.put("/arquivo", ArchiveSolicitacao.archiveSolicitacao);
routes.delete("/delete", deleteSolicitacao.deleteSolicitacao);

export default routes;
