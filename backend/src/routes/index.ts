import user from "./user";
import grupo from "./grupo";
import notificacao from "./notificacao";
import UserController from "../controllers/UserController";
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import GetAllSolicitacao from "../services/GetAllSolicitacao";
import ArchiveSolicitacao from "../services/ArchiveSolicitacao";
import deleteSolicitacao from "../services/deleteSolicitacao";
import SolicitacaoController from "../controllers/SolicitacaoController";
import GrupoController from "../controllers/GrupoController";
import { authorization } from "../middlewares";
import { adaptMulter as upload } from '../main/adapters/multer';
import { makeTicketController } from '../main/factories/application/controllers';
import { adaptRoute } from '../main/adapters/express-router';

import { Router } from "express";

const routes = Router();

routes.use("/usuario", user);
routes.post("/login", UserController.login);
routes.post("/create/usuario", UserController.create);
routes.put("/update/:id", UserController.update);

routes.use("/notificacao", authorization, notificacao);

routes.post("/ticket", authorization, upload, adaptRoute(makeTicketController()));

routes.put("/update/solicitacao/:id", authorization, SolicitacaoController.update);

routes.get("/solicitacao/:id", GetOneSolicitacao.getSolicitacaoById);
routes.get("/all", GetAllSolicitacao.getAllSolicitacao);
routes.put("/arquivo/:id", ArchiveSolicitacao.archiveSolicitacao);
routes.delete("/delete/:id", deleteSolicitacao.deleteSolicitacao);

routes.use("/grupo", authorization, grupo);
routes.post("/create/grupo", authorization, GrupoController.create);

export default routes;
