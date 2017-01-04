
import {Role} from "../authentication/shared/Role";
export class EndpointConstraints
{
    constructor(role: Role) {
        this.role = role;
    }

    role:Role;

}