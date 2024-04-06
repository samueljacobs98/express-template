import express from "express";
import { requestWrapper } from "../../../../api/router";
import { PathWithRouter } from "../../../../api/core/types";
import { pingController } from "../../controllers";

const domainPath = "/ping";

const router = express.Router();

router.get("/", requestWrapper(pingController.handleRequest));

export const pathWithRouter: PathWithRouter = [domainPath, router];
