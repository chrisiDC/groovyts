import {Promise} from "q";
import Q = require("q");

export interface IHttpClient {
    useAuthToken(token:string):void;
    removeAuthToken():void;
    post<T>(url: string, requestData: any): Promise<T>;
    get<T>(url: string): Promise<T>;
}