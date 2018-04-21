import * as _ from "lodash";
import * as express from "express";

import { IRouteConfigService } from "./route-config-service.interface";
import { RouteConfig } from "./route-config";
import { Route } from "./route";
import { Utility } from "../utility";

export class RouteConfigService implements IRouteConfigService {
    configureRouter(app: express.Application, router: RouteConfig) {
        this.configureRoutes(app, router.mountPath, router.routes);
    }
    
    configureRouters(app: express.Application, routers: RouteConfig[]) {
        _.each(routers, (router: RouteConfig) => {
            // Configure the routes for this router
            this.configureRoutes(app, router.mountPath, router.routes);
        });
    }

    private configureRoutes(app: express.Application, rootPath: string, routes: Route[]) {
        _.each(routes, (route: Route) => {
            // Set up the route/handler
            const path = "/" + Utility.Url.combineParts([rootPath, route.path]);
            Utility.Route.setupHandler(app, route.httpVerb, path, route.handler);
        });
    }
}