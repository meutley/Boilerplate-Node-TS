import { Config } from "../../config";
import { IConsoleWriter } from "../abstraction/console-writer.interface";
import { ILogger } from "./logger.interface";

export class ConsoleLogger implements ILogger {
    private _consoleWriter: IConsoleWriter;
    private _config: Config = null;
    
    constructor(consoleWriter: IConsoleWriter, config: Config) {
        if (!consoleWriter) {
            throw new Error("consoleWriter is required");
        }
        
        if (!config) {
            throw new Error("config is required");
        }
        
        this._consoleWriter = consoleWriter;
        this._config = config;
    }
    
    debug(obj: any) {
        if (this._config.debug === true) {
            this._consoleWriter.write("[DEBUG]", obj);
        }
    }

    info(obj: any) {
        this._consoleWriter.write("[INFO]", obj);
    }
}