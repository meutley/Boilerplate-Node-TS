import { Environment } from './environment';
class Server {
    listeningPort: number;

    constructor(listeningPort: number) {
        this.listeningPort = listeningPort;
    }
}

export class Config {
    debug: boolean = false;
    environment: Environment;

    server: Server;

    constructor() {
        this.server = new Server(3000);
    }
}

const baseConfig = new Config();
export const BaseConfig = baseConfig;