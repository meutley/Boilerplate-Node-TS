import { Utility } from "../../web/core/utility";
import { ConsoleLogger } from "../../web/core/logger";
import { ConsoleWriter } from "../../web/core/abstraction";
import { RouteConfigService } from "../../web/core/routing/route-config-service";
import { UserService } from "../../web/services/users";
import { BaseController } from "../../web/controllers/base.controller";
import { Server } from "../../web/server";

// Build test objects
const config = Utility.Config.getConfig("Debug");
const consoleWriter = new ConsoleWriter();
const logger = new ConsoleLogger(consoleWriter, config);
const routeConfigService = new RouteConfigService();

export const configureServer = (controller: BaseController): Server => {
    const server = new Server(config, logger, routeConfigService);
    server.configureController(controller);
    server.finalize();

    return server;
}