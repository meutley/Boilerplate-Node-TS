import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { ApplicationState } from '../../application-state';
import { RouteConfig } from '../../core/routing';

const routeConfig = new RouteConfig('/api/authentication');

// POST /api/authentication/register
routeConfig.post('/register',
    (request: express.Request, response: express.Response) => {
        const config = ApplicationState.config;
        if (!config) {
            throw new Error("config is required for authentication routes");
        }
        
        var hashedPassword = bcrypt.hashSync("request.body.password", 8);

        // create user

        // set id = new user id
        const token = jwt.sign({ id: 0 }, config.authentication.secret, {
            expiresIn: config.authentication.expirationSeconds
        });

        response
            .status(200)
            .send({
                authenticated: true,
                token: token
            });
    }
);

// POST /api/authentication/login
routeConfig.post('/login',
    (request: express.Request, response: express.Response) => {
        const config = ApplicationState.config;
        if (!config) {
            throw new Error("config is required for authentication routes");
        }

        // try to find user
        /* if user not found...
        response
            .status(401)
            .send('Invalid username/password');
        return;
        */

        /* compare password...
        var passwordMatches = bcrypt.compareSync(request.body.password, user.password);
        if (!passwordMatches) {
            response
                .status(401)
                .send('Invalid username/password');
            return;
        }
        */
        
        var hashedPassword = bcrypt.hashSync("request.body.password", 8);

        // set id = id of user we found
        const token = jwt.sign({ id: 0 }, config.authentication.secret, {
            expiresIn: config.authentication.expirationSeconds
        });

        response
            .status(200)
            .send({
                authenticated: true,
                token: token
            });
    }
);

// GET /api/authentication/test-auth
routeConfig.post('/test-auth',
    (request: express.Request, response: express.Response) => {
        const config = ApplicationState.config;
        if (!config) {
            throw new Error("config is required for authentication routes");
        }

        const token = RouteConfig.getJwtToken(request);
        if (!token) {
            response
                .status(401)
                .send({
                    authenticated: false,
                    message: "Token is required"
                });
        }

        jwt.verify(token, config.authentication.secret, (err, decoded) => {
            if (err) {
                response
                    .status(500)
                    .send({
                        authenticated: false,
                        message: "Could not verify token"
                    });

                return;
            }

            response
                .status(200)
                .send(decoded);
        });
    }
);

export const Router = routeConfig;