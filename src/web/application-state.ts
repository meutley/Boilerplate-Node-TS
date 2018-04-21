import { Config } from "./config";
import { BaseController } from "./controllers/base.controller";

export const ApplicationState = {
    config: new Config(),
    controllers: []
};