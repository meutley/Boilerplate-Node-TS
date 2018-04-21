import { Environment } from "./environment";

class Server {
    listeningPort: number;

    constructor(listeningPort: number) {
        this.listeningPort = listeningPort;
    }
}

class Authentication {
    secret: string;
    expirationSeconds: Number;
    headerName: string;
}

class ViewEngine {
    name: string;
    rootPath: string;

    constructor() {
        this.name = "ejs";
        this.rootPath = "views";
    }
}

export class Config {
    debug: boolean = false;
    environment: Environment;
    authentication: Authentication;
    viewEngine: ViewEngine;

    server: Server;

    constructor() {
        this.server = new Server(3000);
        this.authentication = new Authentication();
        this.viewEngine = new ViewEngine();
    }
}

const baseConfig = new Config();

// Build out base configuration
baseConfig.authentication.expirationSeconds = 86400;
/* ==============================================
   DO NOT STORE THE SECRET IN PLAIN TEXT OR IN
   THE CODE IN PRODUCTION. INSTEAD, USE AN
   ENVIRONMENT/PROCESS VARIABLE.

   YOU CAN KEEP THE DEMO SECRET HERE AND OVERRIDE
   IT WITH AN ENV VARIABLE IN THE PRODUCTION
   CONFIGURATION FILE.
   ============================================== */
baseConfig.authentication.secret = "DEMO_SECRET";
baseConfig.authentication.headerName = "X-AUTH-TOKEN";

export const BaseConfig = baseConfig;