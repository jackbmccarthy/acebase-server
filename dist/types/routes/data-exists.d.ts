import { RouteInitEnvironment, RouteRequest } from '../shared/env';
export declare type RequestQuery = null;
export declare type RequestBody = null;
export declare type ResponseBody = {
    exists: boolean;
};
export declare type Request = RouteRequest<RequestQuery, RequestBody, ResponseBody>;
export declare const addRoute: (env: RouteInitEnvironment) => void;
export default addRoute;
//# sourceMappingURL=data-exists.d.ts.map