import * as express from "express";

import { BaseController } from "./base.controller";

export class HomeController extends BaseController {
    constructor(app: express.Application, name: string) {
        super(name);
    }

    getIndex = (request: express.Request, response: express.Response) => {
        response.render(super.getViewPath("index"), {
            name: request.query.name || "No Name"
        });
    }
}