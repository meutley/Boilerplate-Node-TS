import * as express from "express";

import { assert, expect } from "chai";
import sinon = require("sinon");
import request = require("supertest");

// Test objects
import * as TestUtility from "./test-utility";
import { HomeController } from "../../web/controllers/home.controller";

// Dependencies
import { Server } from "../../web";
import { UserService } from "../../web/services/users";

// Test constants
const EmptyPath = "/";
const EmptyPathWithQuery = "/?name=TEST+NAME";
const HomePath = "/home";
const HomeIndexPath = "/home/index";
const NotFoundPath = "/home/not-found";

let server: Server;

before(() => {
    server = TestUtility.configureServer(new HomeController("Home"));
});

describe("HomeController", () => {
    var sandbox: sinon.SinonSandbox;
    
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(UserService, "findAll").returns(Promise.resolve([]));
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    it("should return 200 and render Home/Index HTML when GET /", (done) => {
        request(server.ExpressApp)
            .get(EmptyPath)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                assert.isDefined(res.text);
                assert.isTrue(res.text.indexOf("<h1>Home - No Name</h1>") >= 0);
                assert.isTrue(res.text.indexOf("<strong>User count:</strong> 0") >= 0);

                done();
            });
    });

    it("should return 200 and render Home/Index HTML with user count when GET /", (done) => {
        sandbox.restore();
        sandbox.stub(UserService, "findAll").returns(Promise.resolve([{}]));
        
        request(server.ExpressApp)
            .get(EmptyPath)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                console.log(res.text);
                assert.isDefined(res.text);
                assert.isTrue(res.text.indexOf("<h1>Home - No Name</h1>") >= 0);
                assert.isTrue(res.text.indexOf("<strong>User count:</strong> 1") >= 0);

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