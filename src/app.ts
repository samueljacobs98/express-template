import express from "express";
import listEndpoints from "express-list-endpoints";
import * as middleware from "./api/middleware";
import * as setup from "./api/setup";
import { Logger } from "./api/utils";
import { config } from "./api/config";

const logger = Logger.new("app");

const app = express();
const router = express.Router();

middleware.addMiddleware(app);

setup.setupRoutes(app, router);

app.listen(config.app.port, () => {
  logger.log(
    "app.listen",
    `
        
        Server is running on port ${config.app.port}
        Base URL: ${config.app.baseURL}

        Endpoints:
        ${listEndpoints(app).map(
          (e) => `
            [Path | ${e.path}]
            [Methods | ${e.methods.join(", ")}]
            [Middlewares | ${e.middlewares.join(", ")}]
        `
        )}
        `
  );
});
