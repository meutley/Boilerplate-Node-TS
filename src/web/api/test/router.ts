import * as express from "express";

import { RouteConfig } from "../../core/routing";

const routeConfig = new RouteConfig("/api/test");

// GET /api/test
routeConfig.get("",
    (request: express.Request, response: express.Response) => {
        response.send({
            key: "abc",
            value: 123
        });
    }
);

export const Router = routeConfig;