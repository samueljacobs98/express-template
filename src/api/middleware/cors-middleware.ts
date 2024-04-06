import cors from "cors";
import { config } from "../config";

export const corsMiddleware = cors(config.cors);
