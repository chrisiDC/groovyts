import {IHttpClient} from "../client/IHttpClient";
import {Rejection} from "../services/Rejection";
import * as Q from "q";

export class AngularHttpClient implements IHttpClient {
    private token: string;

    constructor(private serverUrl: string, private $http: ng.IHttpService) {

    }

    useAuthToken(token: string): void {
        this.token = token;
    }

    removeAuthToken(): void {
        this.token = null;
    }

    post<T>(url: string, requestData: any): Q.Promise<T> {

        let deferred = Q.defer<T>();
        this.$http({
            method: 'POST',
            url: this.serverUrl + url,
            data: requestData,
            headers: {
                "Content-Type": "application/json",
                token: this.token ? this.token : ""
            }
        }).then((response: any)=> {
            deferred.resolve(response.data);
        }, (response:any) => {
            deferred.reject(Rejection.Error(response));
        });

        return deferred.promise;


    }

    get<T>(url: string): Q.Promise<T> {
        let deferred = Q.defer<T>();
        this.$http({
            method: 'GET',
            url: this.serverUrl + url,
            headers: {
                "Content-Type": "application/json",
                token: this.token ? this.token : ""
            }
        }).then((response: any)=> {
            deferred.resolve(response.data);
        }, (response:any) => {
            deferred.reject(Rejection.Error(response));
        });

        return deferred.promise;
    }

}