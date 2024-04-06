import cors from "cors";

type CorsOptions =
  | cors.CorsOptions
  | cors.CorsOptionsDelegate<cors.CorsRequest>;

const options: CorsOptions = {};

const config = Object.freeze({ ...options });

export { config as cors };
