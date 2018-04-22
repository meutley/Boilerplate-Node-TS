import * as _ from "lodash";
import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";

import { ApplicationState } from "./application-state";
import { Config, Features } from "./config";
import { ILogger } from "./core/logger";
import { IRouteConfigService, RouteConfig } from "./core/routing";
import { Utility } from "./core/utility";
import { BaseController } from "./controllers/base.controller";
import { ResponseUtility } from "./core/utility/response-utility";
import * as DefaultRouteHandler from "./default-route-handler";

export class Server {
    private _app: express.Application = null;
    private _config: Config = null;
    private _logger: ILogger = null;
    private _routeConfigService: IRouteConfigService = null;
    private _controllers: BaseController[] = null;

    public get ExpressApp(): express.Application {
        return this._app;
    }

    constructor(config: Config, logger: ILogger, routeConfigService: IRouteConfigService) {
        this._app = express();
        this._config = config;
        this._logger = logger;
        this._routeConfigService = routeConfigService;
        this._controllers = [];

        ApplicationState.config = this._config;

        this.configureViewEngine();
        this.configureMiddleware();
    }

    configureApiRouter(router: RouteConfig) {
        if (this._config.getFeature(Features.Api).isEnabled === true) {
            this._routeConfigService.configureRouter(this._app, router);
            this._logger.debug(`Registered an API router: ${router.mountPath}`);
        }
    }

    configureApiRouters(routers: RouteConfig[]) {
        if (this._config.getFeature(Features.Api).isEnabled === true) {
            this._routeConfigService.configureRouters(this._app, routers);

            if (this._config.debug === true) {
                _.forEach(routers, (r: RouteConfig) => {
                    this._logger.debug(`Registered an API router: ${r.mountPath}`);
                });
            }
        }
    }

    configureController(controller: BaseController) {
        if (this._config.getFeature(Features.WebEndpoints).isEnabled === true) {
            const found = _.filter((c) => c.name.toUpperCase() === controller.controllerName.toUpperCase());
            if (found && found.length > 0) {
                throw new Error(`A controller with the name ${controller.controllerName} has already been registered`);
            } else {
                this._controllers.push(controller);
                this._logger.debug(`Registered a controller: ${controller.controllerName}`);
            }
        }
    }

    configureControllers(controllers: BaseController[]) {
        if (this._config.getFeature(Features.WebEndpoints).isEnabled === true) {
            _.forEach(controllers, (controller) => {
                this.configureController(controller);
            });
        }
    }

    finalize() {
        if (this._config.getFeature(Features.WebEndpoints).isEnabled === true) {
            DefaultRouteHandler.configureDefaultRouteHandler(this._app, this._controllers);
        }
    }
    
    start() {
        this._app.listen(this._config.server.listeningPort, () => {
            this.onStarted();
        });
    }

    private configureViewEngine() {
        this._app.set("views", path.join(__dirname, this._config.viewEngine.rootPath));
        this._app.set("view engine", this._config.viewEngine.name);

        this._logger.debug(`Views path: ${this._config.viewEngine.rootPath}`);
        this._logger.debug(`View engine: ${this._config.viewEngine.name}`);
    }

    private configureMiddleware() {
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(bodyParser.json());
    }

    private onStarted() {
        this._logger.info(`Web Server listening on port ${this._config.server.listeningPort}`);
    }
}