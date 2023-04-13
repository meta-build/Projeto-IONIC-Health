import { Router } from "express";
import NotificacaoController from "../controllers/NotificacaoController";
import { authorization } from "../middlewares";

const routes = Router();

//routes.get('/', NotificacaoController.list);
routes.post('/', authorization, NotificacaoController.create);
//routes.put('/', NotificacaoController.update);
//routes.delete('/', NotificacaoController.delete);

export default routes;