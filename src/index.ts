// General imports
import { ConsoleWriter } from './web/core/abstraction';
import { ILogger, ConsoleLogger } from './web/core/logger';
import { RouteConfigService } from './web/core/routing/route-config-service';
import { Utility } from './web/core/utility';

// Web and API
import * as Web from './web';
import * as Api from './web/api';
import * as Controllers from "./web/controllers";

// Server dependencies
const defaultEnvironment = 'Local';
const config = Utility.Config.getConfig(process.env.key || defaultEnvironment);
const consoleWriter = new ConsoleWriter();
const logger = new ConsoleLogger(consoleWriter, config);

const routeConfigService = new RouteConfigService();

// Initialize and start the server
const server = new Web.Server(config, logger, routeConfigService);
server.configureApiRouters(Api.Routers);
Controllers.configure(server);
server.finalize();
server.start();