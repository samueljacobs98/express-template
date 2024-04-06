import { Router } from "express";
import { PathWithRouter } from "../core/types";
import { Logger } from "../utils";

const logger = Logger.new("add-routes");

export const addRoutes = (router: Router, routes: PathWithRouter[]) => {
  routes.forEach(([path, pathRouter]) => {
    logger.log("addRoutes", `Adding route ${path}`);
    router.use(path, pathRouter);
  });
};
