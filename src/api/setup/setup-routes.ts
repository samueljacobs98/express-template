import { Router, Express } from "express";
import { pathsWithRouters } from "../../versions";
import { addRoutes } from "../router";
import { Logger } from "../utils";

const logger = Logger.new("setup-api-configuration");

export const setupRoutes = (app: Express, router: Router) => {
  logger.log("setupRoutes", "Setting up routes");

  pathsWithRouters.forEach((versionPaths) => {
    addRoutes(router, versionPaths);
  });

  app.use(router);
};
