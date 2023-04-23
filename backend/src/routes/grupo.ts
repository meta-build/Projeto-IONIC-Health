import { Router } from "express";
import { authorization } from "../middlewares";
import GrupoController from "../controllers/GrupoController";

const routes = Router();

routes.post("/create/grupo", authorization, GrupoController.create);

export default routes;
