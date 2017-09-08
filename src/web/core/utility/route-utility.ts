import * as express from 'express';

import { HttpVerb } from '../http-verb';
import { IRouteHandler } from '../routing';

export const setupHandler = (app: express.Application, httpVerb: HttpVerb, path: string, handler: IRouteHandler): any => {
    switch (httpVerb) {
        case HttpVerb.Get:
            app.get(path, handler);
            break;
        case HttpVerb.Post:
            app.post(path, handler);
            break;
        case HttpVerb.Put:
            app.put(path, handler);
            break;
        default:
            app.use(path, handler);
            break;
    }
}