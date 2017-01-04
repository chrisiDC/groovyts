import {IUserService} from "./IUserService";
import {Collection} from "../../db/Collection";
import {ApiUser} from "./ApiUser";
import {Role} from "../shared/Role";
import {Rejection} from "../../services/Rejection";
import Q = require("q");

export class UserService implements IUserService {

    constructor(private users: Collection<ApiUser>) {

    }

    getUser(id: string): Q.Promise<ApiUser> {
        return this.users.getById(id);
    }
    getUserByNick(nick: string): Q.Promise<ApiUser> {
        let deferred = Q.defer<ApiUser>();
        this.users.get({nick: nick})
            .then((users: Array<ApiUser>) => {

                if (users.length === 1) deferred.resolve(users[0]);
                else deferred.reject(Rejection.NOTFOUND);
            })
            .fail((reason) => deferred.reject(reason));

        return deferred.promise;


    }

    addUser(nick: string, password: string, role: Role): Q.Promise<ApiUser> {
        return this.users.insert(new ApiUser(nick, password, role));
    }

    deleteUser(id: string): Q.Promise<void> {
        return this.users.delete(id);

    }

}
