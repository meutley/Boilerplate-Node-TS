import * as _ from "lodash";

export const combineParts = (parts: string[]) => parts.map((s) => _.trim(s, "/")).join("/");