import * as express from "express";

export interface IRouteHandler {
    (request: express.Request, response: express.Response): any;
}