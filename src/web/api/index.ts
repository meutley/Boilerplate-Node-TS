import { Router as AuthenticationApi } from "./authentication/router";
import { Router as TestApi } from "./test/router";
import { Server } from "../server";

const Routers = [
    AuthenticationApi,
    TestApi
];

export const configure = (server: Server) => {
    server.configureApiRouters(Routers);
}