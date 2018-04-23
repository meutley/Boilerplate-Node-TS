import { Config } from "./config";
import { ILogger } from "./core/logger";

var _logger: ILogger;

export const ApplicationState = {
    config: new Config(),
    logger: _logger
};