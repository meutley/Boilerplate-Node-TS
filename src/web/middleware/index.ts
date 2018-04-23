import * as express from "express";
import * as bodyParser from "body-parser";

import * as GlobalErrorHandling from "./global-error-handling";

export const configure = (application: express.Application) => {
    application.use(bodyParser.urlencoded({ extended: false }));
    application.use(bodyParser.json());
}

export const configureErrorHandling = (application: express.Application) => {
    application.use(GlobalErrorHandling.logger);
    application.use(GlobalErrorHandling.handler);
}