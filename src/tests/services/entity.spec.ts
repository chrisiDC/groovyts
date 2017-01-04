var expect = require('chai').expect;
import * as _ from "lodash";

import {Entity} from "../../services/Entity";

class SomeEntityDTO
{
    id:string;
    name:string;
}
class SomeEntity implements Entity<SomeEntityDTO>
{
    id:string;
    name:string;
    password:string;

    someMethod():number
    {
        return 0;
    }

    map(): SomeEntityDTO {
        let dto = new SomeEntityDTO();
        dto.id = this.id;
        dto.name = this.name;
        return dto;
    }

    fromJSON(o: any): SomeEntity {
        let entity = new SomeEntity();
        _.assign(entity,o);
        return entity;
    }


}
describe('test services:entity',  ()=> {

    it('map from json', ()=> {
        let jsonObject = {id:"1",name:"xxx",password:"aaa"};
        let entity = new SomeEntity().fromJSON(jsonObject);
        expect(entity.someMethod).to.be.a('function');
        expect(entity.someMethod()).to.equal(0);
        expect(entity.id).to.equal("1");

    });
});

