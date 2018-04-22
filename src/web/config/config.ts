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

class Database {
    private _username: string;
    private _password: string;
    private _url: string;
    private _port: string;
    private _databaseName: string;

    public get username(): string {
        return this._username;
    }

    public get password(): string {
        return this.password;
    }

    public get url(): string {
        return this._url;
    }

    public get port(): string {
        return this._port;
    }

    public get databaseName(): string {
        return this._databaseName;
    }

    public get connectionString(): string {
        return `mongodb://${this._username}:${this._password}@${this._url}:${this._port}/${this._databaseName}`;
    }

    constructor(username: string, password: string, url: string, port: string, databaseName: string) {
        this._username = username;
        this._password = password;
        this._url = url;
        this._port = port;
        this._databaseName = databaseName;
    }
}

export const Features = {
    Api: "ApiEndpoints",
    WebEndpoints: "WebEnpoints"
}

export class Config {
    debug: boolean;
    environment: Environment;
    authentication: Authentication;
    viewEngine: ViewEngine;
    features: Feature[];
    database: Database;

    server: Server;

    constructor() {
        this.debug = false;
        this.server = new Server();
        this.authentication = new Authentication();
        this.viewEngine = new ViewEngine();
        this.features = [
            new Feature(Features.Api, true),
            new Feature(Features.WebEndpoints, true)
        ];
        this.database = new Database(
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            process.env.DB_URL,
            process.env.DB_PORT,
            process.env.DB_NAME);
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