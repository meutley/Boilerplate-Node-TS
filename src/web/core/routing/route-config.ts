import * as express from 'express';

import { HttpVerb } from '../http-verb';
import { Route } from './route';
import { IRouteHandler } from './route-handler';
import { ApplicationState } from '../../application-state';

export class RouteConfig {
    private _mountPath: string;
    private _routes: Route[];

    public get mountPath(): string {
        return this._mountPath;
    }

    public get routes(): Route[] {
        return this._routes;
    }
    
    constructor(mountPath: string, routes?: Route[]) {
        this._mountPath = mountPath || '/';
        this._routes = routes || [];
    }

    get(path: string, handler: IRouteHandler) {
        this.addRoute(HttpVerb.Get, path, handler);
    }

    post(path: string, handler: IRouteHandler) {
        this.addRoute(HttpVerb.Post, path, handler);
    }

    put(path: string, handler: IRouteHandler) {
        this.addRoute(HttpVerb.Put, path, handler);
    }

    static getJwtToken(request: express.Request): string {
        let token = request.headers[ApplicationState.config.authentication.headerName];
        return token.toString();
    }
    
    private addRoute(httpVerb: HttpVerb, path: string, handler: IRouteHandler) {
        const route = new Route(httpVerb, path, handler);
        this._routes.push(route);
    }
}