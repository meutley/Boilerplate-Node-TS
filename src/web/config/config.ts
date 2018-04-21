import { Environment } from "./environment";

class Server {
    listeningPort: number;
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

class Feature {
    private _name: string;
    private _isEnabled: boolean;

    public get name(): string {
        return this._name;
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    constructor(name: string, isEnabled: boolean) {
        this._name = name;
        this._isEnabled = isEnabled;
    }

    enable() {
        this._isEnabled = true;
    }

    disable() {
        this._isEnabled = false;
    }
}

export const Features = {
    Api: "ApiEndpoints",
    WebEndpoints: "WebEnpoints"
}

export class Config {
    debug: boolean = false;
    environment: Environment;
    authentication: Authentication;
    viewEngine: ViewEngine;
    features: Feature[];

    server: Server;

    constructor() {
        this.server = new Server();
        this.authentication = new Authentication();
        this.viewEngine = new ViewEngine();
        this.features = [
            new Feature(Features.Api, true),
            new Feature(Features.WebEndpoints, true)
        ];
    }

    getFeature = (name: string) => {
        const feature = this.features.find((f) => f.name.toLowerCase() === name.toLowerCase());
        return feature;
    }

    enableFeature = (name: string) => {
        const feature = this.features.find((f) => f.name.toLowerCase() === name.toLowerCase());
        if (feature) {
            feature.enable();
        }
    }

    disableFeature = (name: string) => {
        const feature = this.features.find((f) => f.name.toLowerCase() === name.toLowerCase());
        if (feature) {
            feature.disable();
        }
    }
}

const DefaultServerPort = 3000;
const baseConfig = new Config();

// Build out base configuration
/* Server */
baseConfig.server.listeningPort = DefaultServerPort;

/* Authentication */
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