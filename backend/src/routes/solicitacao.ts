import { Router } from "express";
import SolicitacaoController from "../controllers/SolicitacaoController";
import GetAllSolicitacao from "../services/GetAllSolicitacao";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import ArchiveSolicitacao from "../services/ArchiveSolicitacao";
import deleteSolicitacao from "../services/deleteSolicitacao";

const routes = Router();


routes.post("/create", SolicitacaoController.create);
routes.put("/update", SolicitacaoController.update);
routes.get("/solicitacao", GetOneSolicitacao.getSolicitacaoById);
routes.get("/all", GetAllSolicitacao.getAllSolicitacao);
routes.put("/arquivo", ArchiveSolicitacao.archiveSolicitacao);
routes.delete("/delete", deleteSolicitacao.deleteSolicitacao);

export default routes;