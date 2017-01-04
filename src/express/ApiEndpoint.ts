import {Express} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {Response} from "express-serve-static-core";
import {EndpointConstraints} from "./EndpointConstraints";
import {ILoggable} from "../logging/ILoggable";
import {Rejection} from "../services/Rejection";
export class ApiEndpoint {


    constructor(private app: Express, private endpoint: string, private logger: ILoggable, private serviceInstance: any) {

    }

    post(func: string, bodyParams: Array<string>, constraints: EndpointConstraints): void {
        this.route("post", func, bodyParams, constraints);
    }

    get(func: string, bodyParams: Array<string>, constraints: EndpointConstraints): void {
        this.route("get", func, bodyParams, constraints);
    }

    put(func: string, bodyParams: Array<string>, constraints: EndpointConstraints): void {
        this.route("put", func, bodyParams, constraints);
    }

    delete(func: string, bodyParams: Array<string>, constraints: EndpointConstraints): void {
        this.route("put", func, bodyParams, constraints);
    }


    private route(method: string, func: string, params: Array<string>, constraints: EndpointConstraints): void {

        this.app[method](this.endpoint, (req: Request, res: Response)=> {
            if (constraints.role > req.user.role) {
                this.logger.warn({msg: "unauthorized api call", func: func});
                res.status(401).end();
            }
            else {

                let keys = method === "get" ? Object.keys(req.query) : Object.keys(req.body);
                this.logger.debug({msg: "incoming api request", keys: keys, func: func});
                let i = 0;
                let validParams: boolean = keys.length === params.length;
                keys.forEach(key=>validParams = validParams && params.indexOf(key) != -1);

                if (!validParams) {
                    this.logger.warn({msg: "api called with wrong parameters", func: func});
                    res.status(400).end();
                }
                else {
                    let values = keys.map(key => method === "get" ? req.query[key] : req.body[key]);
                    let i = 0;
                    this.serviceInstance[func].apply(this.serviceInstance, values)
                        .then((response: any)=> {


                            let serialized: any;
                            if (response) {
                                if (response.constructor === Array) {
                                    serialized = response.map(item=>this.map(item));
                                }
                                else {
                                    serialized = this.map(response);
                                }
                            }

                            this.logger.debug({
                                msg: "outgoing api result",
                                success: true,
                                data: serialized
                            });

                            res.send(serialized);

                        })
                        .fail((reason: any)=> {

                            if (reason instanceof Rejection) {
                                this.logger.debug({
                                    msg: "api call returns with rejected promise ",
                                    method: func,
                                    reason: JSON.stringify(reason)
                                });
                                let status = 400;
                                if (reason.Code === Rejection.NOTAUTHENTICATED || reason.Code === Rejection.DENIED) status = 401;
                                res.status(status).send({reason:reason.Code});
                            }
                            else if (reason instanceof Error) {
                                this.logger.error({msg: "api call error", method: func, error: reason.stack});
                                res.status(500).end();
                            }
                            else {
                                this.logger.error({msg: "api call error", method: func, error: "not an error object"});
                                res.status(500).end();
                            }

                        });
                }
            }
        })
    }

    private map(o:any):any
    {
        if (typeof o.map === "function") {
            return o.map();
        }
        else return o;
    }

}