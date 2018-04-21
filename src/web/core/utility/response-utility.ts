import * as express from "express";

import { HttpStatusCodes } from "../http-status-codes";

export class ResponseUtility {
    static ok(response: express.Response, responseBody?: any): express.Response {
        return this.buildResponse(HttpStatusCodes.ok, response, responseBody);
    }
    
    static badRequest(response: express.Response, responseBody?: any): express.Response {
        return this.buildResponse(HttpStatusCodes.badRequest, response, responseBody);
    }

    static unauthorized(response: express.Response, responseBody?: any): express.Response {
        return this.buildResponse(HttpStatusCodes.unauthorized, response, responseBody);
    }

    static notFound(response: express.Response, responseBody?: any): express.Response {
        return this.buildResponse(HttpStatusCodes.notFound, response, responseBody);
    }

    static serverError(response: express.Response, responseBody?: any): express.Response {
        return this.buildResponse(HttpStatusCodes.serverError, response, responseBody);
    }

    private static buildResponse(httpStatusCode: number, response: express.Response, responseBody?: any): express.Response {
        return responseBody
            ? response.status(httpStatusCode).send(responseBody)
            : response.sendStatus(httpStatusCode);
    }

    private static addResponseBody(response: express.Response, responseBody?: any): express.Response {
        if (responseBody) {
            return response.send(responseBody);
        } else {
            response.send();
        }
    }
}