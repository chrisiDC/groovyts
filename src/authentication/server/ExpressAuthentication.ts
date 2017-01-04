import {Strategy} from "passport";
import {IUserService} from "./IUserService";
import {Express} from "express";
import {ApiUser} from "./ApiUser";
import {Rejection} from "../../services/Rejection";
import {ExtractJwt} from "passport-jwt";
import ILogService = angular.ILogService;
import {ILoggable} from "../../logging/ILoggable";
import * as jwt from "passport-jwt";
/*let jwt = require('passport-jwt');*/

let passport = require("passport")
    , JwtStrategy = require('passport-jwt').Strategy;


export class ExpressAuthentication {

    constructor(private app: Express, private key: string, private userService: IUserService, private logger: ILoggable) {
        passport.use(new JwtStrategy({
            secretOrKey: key,
            jwtFromRequest: ExtractJwt.fromAuthHeader()
        }, this.getUserFromJWT));
        app.use(passport.initialize());
        app.post('/api/authenticate', (req, res) => {this.authenticate(req, res)});
        app.get('/api/logout',
            function (req, res) {
                req.logout();
                res.redirect('/');
            });
    }

    private authenticate(req, res): void {

        this.userService.getUserByNick(req.body.name)
            .then((user: ApiUser) => {

                if (user) {
                    if (user.password === req.body.password) {
                        // if user is found and password is right create a token

                       /* let token = jwt encode(user, this.key);
                        res.json({success: true, token: 'JWT ' + token});*/

                    }
                    else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                }
                else  res.send({success: false, msg: 'Authentication failed. User not found.'});


            })
            .fail((error: any) => {
                this.logger.error({msg:"failure when authenticating",reason: error});
                res.send({success: false, msg: 'internal error'})
            });

    }

    private getUserFromJWT(jwt_payload, done): void {
        this.userService.getUser(jwt_payload.id)
            .then((user: ApiUser) => {
                if (user) done(null, user);
                else return done(null, false);
            })
            .fail((error) => done(error, false));
    }


    logout(userId: string): Promise<void> {


        return null;
        /* let deferred = Q.defer<void>();

         this.users.getById(userId)
         .then(() => {
         this.playerService.removePlayerById(userId)
         .then(() => {
         deferred.resolve();
         })
         .fail((error: any) => {
         deferred.reject(Rejection.Error(error))
         });

         })
         .fail(() => {
         deferred.reject(Rejection.NotFound());
         });


         return deferred.promise;*/
    }


}