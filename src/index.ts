// General imports
import { RouteConfigService } from './web/core/routing/route-config-service';
import { Utility } from './web/core/utility';

// Web and API
import * as Web from './web';
import * as Api from './web/api';

// Server dependencies
const defaultEnvironment = 'Local';
const config = Utility.Config.getConfig(process.env.key || defaultEnvironment);

const routeConfigService = new RouteConfigService();

// Initialize and start the server
const server = new Web.Server(config, routeConfigService);
server.configureRouters(Api.Routers);
server.start();