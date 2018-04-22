import * as express from "express";

import { BaseController } from "./base.controller";
import { IRouteHandler } from "../core/routing";

export class HomeController extends BaseController {
    constructor(name: string) {
        super(name);
    }

    getIndex: IRouteHandler = (request: express.Request, response: express.Response) => {
        response.render(super.getViewPath("index"), {
            name: request.query.name || "No Name"
        });
    }
}