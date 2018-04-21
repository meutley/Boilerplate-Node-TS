// General imports
import { ConsoleWriter } from "./web/core/abstraction";
import { Features } from "./web/config";
import { ILogger, ConsoleLogger } from "./web/core/logger";
import { RouteConfigService } from "./web/core/routing/route-config-service";
import { Utility } from "./web/core/utility";

// Web and API
import * as Web from "./web";
import * as Api from "./web/api";
import * as Controllers from "./web/controllers";

// Server dependencies
const defaultEnvironment = "Local";
const config = Utility.Config.getConfig(process.env.key || defaultEnvironment);
const consoleWriter = new ConsoleWriter();
const logger = new ConsoleLogger(consoleWriter, config);
const routeConfigService = new RouteConfigService();

/* ========== FEATURES ==========
    Uncomment any/all of these lines to disable specific features.
    For example, disabling Features.Api means all API routes/endpoints
    will not be available. The same concept applies to Features.WebEndpoints,
    meaning if it is disabled, you will not be able to reach the
    controllers/views you have configured.
   ==============================*/
   
// config.disableFeature(Features.Api);
// config.disableFeature(Features.WebEndpoints);

// Initialize and start the server
const server = new Web.Server(config, logger, routeConfigService);
Api.configure(server);
Controllers.configure(server);
server.finalize();
server.start();