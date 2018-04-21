import * as express from "express";

import { assert, expect } from "chai";
import request = require("supertest");

// Test objects
import { HomeController } from "../../web/controllers/home.controller";

// Dependencies
import { Server } from "../../web";
import { Utility } from "../../web/core/utility";
import { ConsoleLogger } from "../../web/core/logger";
import { ConsoleWriter } from "../../web/core/abstraction";
import { RouteConfigService } from "../../web/core/routing/route-config-service";

// Build test objects
const config = Utility.Config.getConfig("Debug");
const consoleWriter = new ConsoleWriter();
const logger = new ConsoleLogger(consoleWriter, config);
const routeConfigService = new RouteConfigService();
let server: Server;

// Constants
const EmptyPath = "/";
const EmptyPathWithQuery = "/?name=TEST+NAME";
const HomePath = "/home";
const HomeIndexPath = "/home/index";
const NotFoundPath = "/home/not-found";

before(() => {
    server = new Server(config, logger, routeConfigService);
    server.configureController(new HomeController(server.ExpressApp, "Home"));
    server.finalize();
});

describe("HomeController", () => {
    it("should return 200 and render Home/Index HTML when GET /", (done) => {
        request(server.ExpressApp)
            .get(EmptyPath)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                assert.isDefined(res.text);
                assert.isTrue(res.text.indexOf("<h1>Home - No Name</h1>") >= 0);

                done();
            });
    });

    it("should return 200 and render Home/Index HTML with name when GET /?name=TEST+NAME", (done) => {
        request(server.ExpressApp)
            .get(EmptyPathWithQuery)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                assert.isDefined(res.text);
                assert.isTrue(res.text.indexOf("<h1>Home - TEST NAME</h1>") >= 0);

                done();
            });
    });

    it("should return 200 and render Home/Index HTML when GET /home", (done) => {
        request(server.ExpressApp)
            .get(HomePath)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                assert.isDefined(res.text);
                assert.isTrue(res.text.indexOf("<h1>Home - No Name</h1>") >= 0);

                done();
            });
    });

    it("should return 200 and render Home/Index HTML when GET /home/index", (done) => {
        request(server.ExpressApp)
            .get(HomeIndexPath)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                assert.isDefined(res.text);
                assert.isTrue(res.text.indexOf("<h1>Home - No Name</h1>") >= 0);

                done();
            });
    });

    it("should return 404 when GET /not-found", (done) => {
        request(server.ExpressApp)
            .get(NotFoundPath)
            .expect(404)
            .end((err, res) => {
                if (err) throw err;

                done();
            });
    });
});