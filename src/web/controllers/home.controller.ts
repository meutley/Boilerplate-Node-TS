import * as express from "express";

import { BaseController } from "./base.controller";
import { IRouteHandler } from "../core/routing";
import { ResponseUtility } from "../core/utility/response-utility";
import { UserService } from "../services/users";

export class HomeController extends BaseController {
    constructor(name: string) {
        super(name);
    }

    getIndex: IRouteHandler = async (request: express.Request, response: express.Response, next?: any) => {
        // Get all users then pass them to the view
        try {
            const users = await UserService
                .findAll()
                .catch(err => { throw err; });

            ResponseUtility.renderView(
                response,
                this.getViewPath("index"),
                {
                    name: request.query.name,
                    users: users
                }
            );
        } catch (err) {
            next(err);
        }
    }
}