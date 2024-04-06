import { Express } from "express";
import { corsMiddleware } from "./cors-middleware";
import { jsonMiddleware } from "./json-middleware";
import { urlencodedMiddleware } from "./urlencoded-middleware";

const middleware = [corsMiddleware, jsonMiddleware, urlencodedMiddleware];

const addMiddleware = (app: Express) => {
  middleware.forEach((m) => app.use(m));
};

export { addMiddleware };
