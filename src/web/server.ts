import * as express from 'express';

import { Config } from './config';
import { IRouteConfigService, RouteConfig } from './core/routing';
import { Utility } from './core/utility';

export class Server {
    private _app: express.Application = null;
    private _config: Config = null;
    private _routeConfigService: IRouteConfigService = null;

    constructor(config: Config, routeConfigService: IRouteConfigService) {
        this._app = express();
        this._config = config;
        this._routeConfigService = routeConfigService;
    }

    configureRouter(router: RouteConfig) {
        this._routeConfigService.configureRouter(this._app, router);
    }

    configureRouters(routers: RouteConfig[]) {
        this._routeConfigService.configureRouters(this._app, routers);
    }

    start() {
        this._app.listen(this._config.server.listeningPort, () => {
            console.log(`Web Server listening on port ${this._config.server.listeningPort}`);
        });
    }
}