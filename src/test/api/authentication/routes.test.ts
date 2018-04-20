import * as _ from 'lodash';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { assert, expect } from 'chai';
import request = require('supertest');

import { ApplicationState } from '../../../web/application-state';
import { Config } from '../../../web/config';
import { Route } from '../../../web/core/routing';
import { Router } from '../../../web/api/authentication/router';
import { Utility } from '../../../web/core/utility';

const rootPath = '/api/authentication';
const app = express();

const setupRoutes = () => {
    _.each(Router.routes, (route: Route) => {
        const path = '/' + Utility.Url.combineParts([rootPath, route.path]);
        Utility.Route.setupHandler(app, route.httpVerb, path, route.handler);
    });
}

before(() => {
    ApplicationState.config = new Config();
    ApplicationState.config.authentication.headerName = "X-TEST-TOKEN";
    ApplicationState.config.authentication.secret = "TEST_SECRET";
    ApplicationState.config.authentication.expirationSeconds = 360;

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    setupRoutes();
});

describe('AuthenticationApi', () => {
    it('should return 200 when POST to /register with password', (done) => {
        var result = request(app)
            .post('/api/authentication/register')
            .send({
                password: "TEST_P@SSW0RD!"
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                assert.isDefined(res.body);
                assert.isDefined(res.body.authenticated);
                assert.isDefined(res.body.token);
                assert.isTrue(res.body.authenticated);
                
                done();
            });
    });

    it('should return 400 when POST to /register without password', (done) => {
        var result = request(app)
            .post('/api/authentication/register')
            .expect(400, done);
    });
});