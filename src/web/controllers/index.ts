import { Server } from "../server";

// Controller imports
import { HomeController } from "./home.controller";

export const configure = (server: Server) => {
    // Configure controllers here
    server.configureController(new HomeController("Home"));
}