import { BaseConfig } from './config';
import { Environment } from './environment';

const _config = Object.assign({}, BaseConfig);

_config.debug = true;
_config.environment = Environment.Local;

export const Config = _config;