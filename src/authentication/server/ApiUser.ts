
import * as _ from "lodash";
import {StoredDocument} from "../../db/StoredDocument";
import {Entity} from "../../services/Entity";
import {ApiUserDTO} from "../shared/ApiUserDTO";
import {Role} from "../shared/Role";

export class ApiUser extends StoredDocument implements Entity<ApiUserDTO> {


    constructor(nick?: string, password?: string, role?: Role) {
        super();
        this.nick = nick;
        this.password = password;
        this.role = role;
    }

    nick: string;
    password: string;
    role: Role;
    token: string = null;

    map(): ApiUserDTO {
        let userDTO = new ApiUserDTO();
        userDTO.id = this._id.toString();
        userDTO.token = this.token;

        return userDTO;
    }

    fromJSON(o: any): ApiUser {
        let entity = new ApiUser();
        try {
            _.assign(entity, o);
        } catch (e) {
            console.log(e);
        }
        return entity;
    }


}