import * as _ from "lodash";
import * as express from "express";
import * as bodyParser from "body-parser";

import { assert, expect } from "chai";
import request = require("supertest");

// Test objects
import { Router } from "../../../web/api/authentication/router";

// Dependencies
import { Server } from "../../../web";
import { Utility } from "../../../web/core/utility";
import { ConsoleLogger } from "../../../web/core/logger";
import { ConsoleWriter } from "../../../web/core/abstraction";
import { RouteConfigService } from "../../../web/core/routing/route-config-service";

const config = Utility.Config.getConfig("Debug");
const consoleWriter = new ConsoleWriter();
const logger = new ConsoleLogger(consoleWriter, config);
const routeConfigService = new RouteConfigService();
let server: Server = new Server(config, logger, routeConfigService);

before(() => {
    server.configureRouter(Router);
});

describe("AuthenticationApi", () => {
    it("should return 200 when POST /register with username and password", (done) => {
        var result = request(server.ExpressApp)
            .post("/api/authentication/register")
            .send({
                username: "TEST_USER@COMPANY.COM",
                password: "TEST_P@SSW0RD!"
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                assert.isDefined(res.body);
                assert.isDefined(res.body.authenticated);
                assert.isDefined(res.body.token);
                assert.isTrue(res.body.authenticated);
                assert.isTrue(res.body.token.length > 0);
                
                done();
            });
    });

    it("should return 400 when POST /register without username", (done) => {
        var result = request(server.ExpressApp)
            .post("/api/authentication/register")
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                
                assert.isDefined(res.body);
                assert.isDefined(res.body.message);
                assert.isTrue(res.body.message === "Username is required");

                done();
            });
    });
    
    it("should return 400 when POST /register without password", (done) => {
        var result = request(server.ExpressApp)
            .post("/api/authentication/register")
            .send({
                username: "TEST_USER@COMPANY.COM"
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                
                assert.isDefined(res.body);
                assert.isDefined(res.body.message);
                assert.isTrue(res.body.message === "Password is required");

                done();
            });
    });
});