import { PathWithRouter } from "../api/core/types";
import { createVersionPathsWithRouters } from "../api/router";
import * as v1 from "./v1/router";

const versions = [v1];

export const pathsWithRouters: PathWithRouter[][] = versions.map((v) =>
  createVersionPathsWithRouters(v.versionPath, v.domainPathsWithRouters)
);
