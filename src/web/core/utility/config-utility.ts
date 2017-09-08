import { Config, ConfigFactory, Environment } from '../../config';

const getEnvironment = (environment: NodeJS.ProcessEnv): Environment => {
    switch (environment.key) {
        case 'Local':
            return Environment.Local;
        case 'Debug':
            return Environment.Debug;
        case 'Qa':
            return Environment.Qa;
        case 'Production':
            return Environment.Production;
        default:
            return Environment.Local;
    }
}

export const getConfig = (environment: NodeJS.ProcessEnv): Config => {
    let env: Environment = getEnvironment(environment);
    return ConfigFactory.getEnvironmentConfig(env);
}