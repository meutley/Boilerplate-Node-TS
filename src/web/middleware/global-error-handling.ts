import * as express from "express";

import { HttpStatusCodes } from "../core/http-status-codes";
import { ResponseUtility } from "../core/utility/response-utility";
import { Server } from "../server";
import { ApplicationState } from "../application-state";

export const logger = (error, request: express.Request, response: express.Response, next) => {
    ApplicationState.logger.debug(error);
    next(error);
}

export const handler = (error, request: express.Request, response: express.Response, next) => {
    ResponseUtility.renderViewWithStatus(response, HttpStatusCodes.serverError, "shared/_error", { error: error });
}