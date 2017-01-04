import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";

export interface IExpressMiddleware {
    run(req: Request, res: Response, next: ()=>void);
}