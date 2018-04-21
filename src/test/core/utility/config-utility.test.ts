import { expect } from "chai";

import { Utility } from "../../../web/core/utility";
import { Environment } from "../../../web/config";

describe("getConfig", () => {
    it("should return the production config", () => {
        let environment = "Production";
        let config = Utility.Config.getConfig(environment);

        expect(config.environment).to.equal(Environment.Production);
    });

    it("should return Local config if config name not found", () => {
        let environment = "Bad_Environment";
        let config = Utility.Config.getConfig(environment);

        expect(config.environment).to.equal(Environment.Local);
    });
});