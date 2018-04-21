import { Utility } from "../core/utility";

export class BaseController {
    protected _controllerName: string;

    public get controllerName(): string {
        return this._controllerName;
    }

    constructor(name: string) {
        this._controllerName = name;
    }

    protected getViewPath(viewName: string): string {
        return Utility.Url.combineParts([this.controllerName.toLowerCase(), viewName]);
    }
}