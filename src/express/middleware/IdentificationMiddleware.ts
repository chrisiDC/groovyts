/*
import {IExpressMiddleware} from "../IExpressMiddleware";
import {Request} from "express-serve-static-core";
import {Response} from "express-serve-static-core";
import {ApiUser} from "../ApiUser";
import {Role} from "../Role";
import {ILoggable} from "../../logging/ILoggable";
import {IAuthenticationService} from "../IAuthenticationService";


export class IdentificationMiddleware implements IExpressMiddleware {


    static authService: IAuthenticationService;
    static logService: ILoggable;

    run(req: Request, res: Response, next: ()=>void) {


        try {
            req.user = new ApiUser("", "", Role.PUBLIC);

            if (req.headers["token"]) {
                IdentificationMiddleware.authService.getUserByToken(req.headers["token"])
                    .then((user: ApiUser)=> {
                        IdentificationMiddleware.logService.debug({msg: "user authenticated by token "});
                        req.user=user;
                        next();
                    })
                    .fail((error: any)=> {
                        IdentificationMiddleware.logService.warn({msg: "Identification Middleware Promise rejected ", reason: JSON.stringify(error)});
                        req.user.role = Role.PUBLIC;
                        next();
                    });
            }
            else
            {
                IdentificationMiddleware.logService.debug({msg: "api called without token"});
                next();
            }
        } catch (e) {

            IdentificationMiddleware.logService.error(e);
            next();
        }


    }

}*/
