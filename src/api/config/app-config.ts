import * as dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.BASE_URL || "http://localhost";
const port = process.env.PORT || 3001;

const app = Object.freeze({ baseURL, port });

export { app };
