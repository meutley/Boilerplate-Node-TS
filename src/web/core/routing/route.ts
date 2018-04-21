import { IRouteHandler } from "./route-handler";
import { HttpVerb } from "../http-verb";

export class Route {
    private _httpVerb: HttpVerb;
    private _path: string;
    private _handler: IRouteHandler;

    public get httpVerb(): HttpVerb {
        return this._httpVerb;
    }

    public get path(): string {
        return this._path;
    }

    public get handler(): IRouteHandler {
        return this._handler;
    }

    constructor(httpVerb: HttpVerb, path: string, handler: IRouteHandler) {
        this._httpVerb = httpVerb;
        this._path = path;
        this._handler = handler;
    }
}