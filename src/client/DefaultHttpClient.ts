import {IHttpClient} from "./IHttpClient";
import {IncomingMessage} from "http";
var Client = require('node-rest-client').Client;
import {Promise} from "q";
import Q = require("q");
import {Rejection} from "../services/Rejection";

export class DefaultHttpClient implements IHttpClient
{

    private token:string;

    constructor(private serverUrl: string) {

    }

    post(url: string, requestData: any): Promise<any> {
        let deferred = Q.defer<any>();
        let client = new Client();

        client.post(this.serverUrl + url, {data: requestData, headers: {"Content-Type": "application/json",token:this.token?this.token:""}}, (data, response: IncomingMessage) => {
            if (response.statusCode === 200) {

                    deferred.resolve(data);
            }
            else {
                deferred.reject(Rejection.Error(response.statusCode));
            }

        });

        return deferred.promise;
    }

    get(url: string): Promise<any> {
        let deferred = Q.defer<any>();
        let client = new Client();

        client.get(this.serverUrl + url, {headers: {"Content-Type": "application/json",token:this.token?this.token:""}}, (data, response: IncomingMessage) => {
            if (response.statusCode === 200) {
                    deferred.resolve(data);
            }
            else {
                deferred.reject(Rejection.Error(response.statusCode));
            }

        });

        return deferred.promise;
    }

    useAuthToken(token: string): void {
        this.token=token;
    }

    removeAuthToken(): void {
        this.token=null;
    }
}