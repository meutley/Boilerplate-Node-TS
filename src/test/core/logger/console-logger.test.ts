import * as sinon from "sinon";
import { assert } from "chai";

import { Config } from "../../../web/config";

import { IConsoleWriter } from "../../../web/core/abstraction";
import { ConsoleLogger } from "../../../web/core/logger";

const Configs = {
    debug: <Config>{ debug: true },
    nonDebug: <Config>{ debug: false }
};

let _consoleWriterMock = null;
let _writeStub = null;
let _logger = null;

beforeEach(() => {
    _consoleWriterMock = <IConsoleWriter>{
        write: () => {}
    };
    
    _writeStub = sinon.stub(_consoleWriterMock, "write");
});

describe("debug", () => {
    it("should call IConsoleWriter when config debug is true", () => {
        let config = Configs.debug;
        _logger = new ConsoleLogger(_consoleWriterMock, config);
        _logger.debug("Test");

        sinon.assert.calledOnce(_writeStub);
    });

    it("should not call IConsoleWriter when config debug is false", () => {
        let config = Configs.nonDebug;
        _logger = new ConsoleLogger(_consoleWriterMock, config);
        _logger.debug("Test");

        sinon.assert.notCalled(_writeStub);
    });
});

describe("info", () => {
    it("should call IConsoleWriter regardless of environment", () => {
        let configs = [
            Configs.debug,
            Configs.nonDebug
        ];

        configs.forEach((config) => {
            _logger = new ConsoleLogger(_consoleWriterMock, config);
            _logger.info("Test");
            
            sinon.assert.called(_writeStub);
        });
    });
});