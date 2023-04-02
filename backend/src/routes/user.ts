import { Router } from "express";
import UserController from "../controllers/UserController";
import {authorization} from '../middlewares';
import GetOneSolicitacao from "../services/GetOneSolicitacao";
import GetAllSolicitacao from "../services/GetAllSolicitacao";

const routes = Router();

routes.post('/', UserController.create);
routes.put('/', authorization, UserController.update);
routes.get('/solicitacao', GetOneSolicitacao.getSolicitacaoById)
routes.get('/all', GetAllSolicitacao.getAllSolicitacao)
export default routes;