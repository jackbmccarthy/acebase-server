import { IAceBaseSchemaInfo } from 'acebase-core/src/api';
import { RouteInitEnvironment, RouteRequest } from '../shared/env';
import { sendError, sendUnauthorizedError } from '../shared/error';

export type RequestQuery = null;
export type RequestBody = null;
export type ResponseBody = IAceBaseSchemaInfo[];
export type Request = RouteRequest<any, ResponseBody, RequestBody, RequestQuery>;

export const addRoute = (env: RouteInitEnvironment) => {

    env.app.get(`/schema/${env.db.name}`, async (req: Request, res) => {
        // Get all defined schemas
        if (!req.user || req.user.username !== 'admin') {
            return sendUnauthorizedError(res, 'admin_only', 'only admin can perform schema operations');
        }
        try {
            const schemas = await env.db.schema.all();
            res.contentType('application/json').send(schemas);
        }
        catch(err) {
            sendError(res, err);
        }
    });

};

export default addRoute;