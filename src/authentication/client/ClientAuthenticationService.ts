import * as Q from "q";
import {IClientAuthenticationService} from "./IClientAuthenticationService";
import {IHttpClient} from "../../client/IHttpClient";
import {ApiUserDTO} from "../shared/ApiUserDTO";
import IModule = angular.IModule;
import {Rejection} from "../../services/Rejection";


export class ClientAuthenticationService implements IClientAuthenticationService {
    constructor(private httpClient: IHttpClient) {

    }

    authenticate(user: string, password: string): Q.Promise<any> {

        let deferred = Q.defer<any>();

        this.httpClient.post("authenticate", {name: user, password: password})
            .then((res: any) => {
            console.log(res);
                if (res.success) {

                    this.httpClient.useAuthToken(res.token);
                    deferred.resolve({success:true});
                }
                else deferred.reject(Rejection.Denied());
            })
            .fail((reason) => deferred.reject(reason));

        return deferred.promise;
    }

    logout(userId: string): Q.Promise<void> {
        return this.httpClient.post<void>("logout", {userId: userId});
    }

    public static angular(app: IModule): void {
        app.service("AuthenticationService", [
            "HttpClient",
            (httpClient: IHttpClient) =>
                new ClientAuthenticationService(httpClient)
        ]);
    }

}





