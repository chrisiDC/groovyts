
import {ApiUserDTO} from "../shared/ApiUserDTO";

export interface IClientAuthenticationService {
    authenticate(user: string, password: string): Q.Promise<any>;
    logout(userId:string): Q.Promise<void>;
}





