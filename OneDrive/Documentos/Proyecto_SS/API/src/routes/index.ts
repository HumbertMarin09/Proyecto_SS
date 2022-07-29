import { Router } from "express";
import auth from "./auth";
import user from "./user";
import form from "./form";
import menor from "./menor";
import domicilios from "./domicilios";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/forms", form);
routes.use("/menores", menor);
routes.use("/domicilios", domicilios);

export default routes;
