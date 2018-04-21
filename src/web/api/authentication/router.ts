import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import { ApplicationState } from "../../application-state";
import { RouteConfig } from "../../core/routing";
import { ResponseUtility } from "../../core/utility/response-utility";

const routeConfig = new RouteConfig("/api/authentication");

// POST /api/authentication/register
routeConfig.post("/register",
    (request: express.Request, response: express.Response) => {
        const config = ApplicationState.config;
        if (!config) {
            throw new Error("config is required for authentication routes");
        }
        
        if (!request.body.username) {
            ResponseUtility.badRequest(response, {
                message: "Username is required"
            });

            return;
        }
        
        if (!request.body.password) {
            ResponseUtility.badRequest(response, {
                message: "Password is required"
            });

            return;
        }
        
        var hashedPassword = bcrypt.hashSync(request.body.password, 8);

        // create user

        // set id = new user id
        const token = jwt.sign({ id: 0 }, config.authentication.secret, {
            expiresIn: config.authentication.expirationSeconds
        });

        ResponseUtility.ok(response, {
            authenticated: true,
            token: token
        });
    }
);

// POST /api/authentication/login
routeConfig.post("/login",
    (request: express.Request, response: express.Response) => {
        const config = ApplicationState.config;
        if (!config) {
            throw new Error("config is required for authentication routes");
        }

        // try to find user
        /* if user not found...
        ResponseUtility.unauthorized(response, "Invalid username/password");
        return;
        */

        /* compare password...
        var passwordMatches = bcrypt.compareSync(request.body.password, user.password);
        if (!passwordMatches) {
            ResponseUtility.unauthorized(response, "Invalid username/password");
            return;
        }
        */
        
        var hashedPassword = bcrypt.hashSync("request.body.password", 8);

        // set id = id of user we found
        const token = jwt.sign({ id: 0 }, config.authentication.secret, {
            expiresIn: config.authentication.expirationSeconds
        });

        ResponseUtility.ok(response, {
            authenticated: true,
            token: token
        });
    }
);

// GET /api/authentication/test-auth
routeConfig.post("/test-auth",
    (request: express.Request, response: express.Response) => {
        const config = ApplicationState.config;
        if (!config) {
            throw new Error("config is required for authentication routes");
        }

        const token = RouteConfig.getJwtToken(request);
        if (!token) {
            ResponseUtility.unauthorized(response, {
                authenticated: false,
                message: "Token is required"
            });

            return;
        }

        jwt.verify(token, config.authentication.secret, (err, decoded) => {
            if (err) {
                ResponseUtility.serverError(response, {
                    authenticated: false,
                    message: "Could not verify token"
                });

                return;
            }

            ResponseUtility.ok(response, decoded);
        });
    }
);

export const Router = routeConfig;