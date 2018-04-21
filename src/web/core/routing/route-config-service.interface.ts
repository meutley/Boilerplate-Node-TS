import * as express from "express";

import { RouteConfig } from "./route-config";

export interface IRouteConfigService {
    configureRouter(app: express.Application, routers: RouteConfig);
    configureRouters(app: express.Application, routers: RouteConfig[]);
}