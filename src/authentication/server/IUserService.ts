import {Promise} from "q";
import {ApiUser} from "./ApiUser";
import {Role} from "../shared/Role";
export interface IUserService {

    getUser(id: string): Promise<ApiUser>;
    getUserByNick(nick: string): Promise<ApiUser>;
    addUser(nick: string, password: string, role: Role): Q.Promise<ApiUser>;
    deleteUser(id: string): Q.Promise<void>;

}