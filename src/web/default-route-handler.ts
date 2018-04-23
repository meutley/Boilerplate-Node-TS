import * as _ from "lodash";
import * as express from "express";

import { BaseController } from "./controllers/base.controller";
import { ResponseUtility } from "./core/utility/response-utility";

const defaultController = "Home";
const defaultAction = "Index";

const findController = (name: string, controllers: BaseController[]) => {
    return _.find(controllers, (c) => c.controllerName.toLowerCase() === name.toLowerCase());
}

const findControllerAction = (request: express.Request, controller: BaseController, action: string) => {
    const requestMethod = request.method.toLowerCase();
    const fullActionName = requestMethod + action;
    // Attempt to find the action, by key, on the controller object
    const controllerMethodName = _.find(Object.keys(controller), (k) => k.toLowerCase() === fullActionName.toLowerCase());
    const controllerMethod = controller[controllerMethodName];

    if (controllerMethod && typeof controllerMethod === "function") {
        return controllerMethod;
    } else {
        return null;
    }
}

const invokeControllerAction =
    (controller: BaseController,
    action: string,
    request: express.Request,
    response: express.Response,
    next?: any) => {
        if (controller) {
            // Invoke the controller action; return not found if it does not exist
            const controllerMethod = findControllerAction(request, controller, action);
            if (controllerMethod) {
                controllerMethod.call(controller, request, response, next);
            } else {
                ResponseUtility.notFound(response);
            }
        } else {
            ResponseUtility.notFound(response);
        }
}

export const configureDefaultRouteHandler = (app: express.Application, controllers: BaseController[]) => {
    app.use("/:controller?/:action?", (request: express.Request, response: express.Response, next?: any) => {
        const params = request.params;
        const controllerName = params.controller || defaultController;
        const actionName = params.action || defaultAction;

        const controller = findController(controllerName, controllers);
        invokeControllerAction(controller, actionName, request, response, next);
    });
}