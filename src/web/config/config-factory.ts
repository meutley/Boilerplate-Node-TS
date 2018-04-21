import { Config } from "./config";
import { Config as LocalConfig } from "./config.local";
import { Config as DebugConfig } from "./config.debug";
import { Config as QaConfig } from "./config.qa";
import { Config as ProductionConfig } from "./config.production";

import { Environment } from "./environment";

export const getEnvironmentConfig = (environment: Environment): Config => {
    switch (environment) {
        case Environment.Local:
            return LocalConfig;
        case Environment.Debug:
            return DebugConfig;
        case Environment.Qa:
            return QaConfig;
        case Environment.Production:
            return ProductionConfig;
        default:
            return LocalConfig;
    }
};