import { BaseConfig } from "./config";
import { Environment } from "./environment";

const _config = Object.assign({}, BaseConfig);

_config.debug = false;
_config.environment = Environment.Qa;

export const Config = _config;