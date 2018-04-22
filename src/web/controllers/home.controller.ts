import * as express from "express";
import { MongoClient, Collection } from "mongodb";

import { BaseController } from "./base.controller";
import { IRouteHandler } from "../core/routing";
import { ResponseUtility } from "../core/utility/response-utility";
import { UserService } from "../services/users";

export class HomeController extends BaseController {
    constructor(name: string) {
        super(name);
    }

    getIndex: IRouteHandler = (request: express.Request, response: express.Response) => {
        // Get all users then pass them to the view
        UserService
            .findAll()
            .then((users) => {
                ResponseUtility.renderView(
                    response,
                    super.getViewPath("index"),
                    {
                        name: request.query.name,
                        users: users
                    }
                );
            })
            .catch((err) => {
                ResponseUtility.serverError(response, err);
            });
    }
}