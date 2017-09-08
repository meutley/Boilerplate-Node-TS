import { BaseConfig } from './config';
import { Environment } from './environment';

const _config = BaseConfig;

_config.debug = false;
_config.environment = Environment.Qa;

export const Config = _config;