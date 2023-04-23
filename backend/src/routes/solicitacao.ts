import { Router } from "express";
import SolicitacaoController from "../controllers/SolicitacaoController";
import GetAllSolicitacao from "../services/GetAllSolicitacao";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import ArchiveSolicitacao from "../services/ArchiveSolicitacao";
import deleteSolicitacao from "../services/deleteSolicitacao";
import { authorization } from "../middlewares";

const routes = Router();

routes.put("/update/solicitacao/:id", authorization, SolicitacaoController.update);
routes.get("/solicitacao", GetOneSolicitacao.getSolicitacaoById);
routes.get("/all", GetAllSolicitacao.getAllSolicitacao);
routes.put("/arquivo", ArchiveSolicitacao.archiveSolicitacao);
routes.delete("/delete", deleteSolicitacao.deleteSolicitacao);

export default routes;
