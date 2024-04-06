import { PathWithRouter } from "../core/types";

export const createVersionPathsWithRouters = (
  versionPath: string,
  domainPathsWithRouters: PathWithRouter[]
): PathWithRouter[] =>
  domainPathsWithRouters.map(([domainPath, domainRouter]) => [
    `${versionPath}${domainPath}`,
    domainRouter,
  ]);
