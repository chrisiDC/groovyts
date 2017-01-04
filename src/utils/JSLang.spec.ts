/*
import should = require('should');
import {ArrayUtils} from "./JSLang";


class User {
    constructor(nick: string, password: string) {
        this.nick = nick;
        this.password = password;
    }

    nick: string;
    password: string;
}

describe('test ArrayUtils class', ()=> {

    it('should get the correct index', ()=> {

        let user = new User("yyyy","");
        let users:Array<User> = [new User("xxx",""),user];

        let index = ArrayUtils.indexOf(user,"nick","yyyy",users);
        index.should.be.equal(1);
    });


    it('should remove an item', ()=> {

        let user = new User("yyyy","");
        let users:Array<User> = [new User("xxx",""),user];

        ArrayUtils.remove(user,"nick","yyyy",users);
        users.length.should.be.equal(1);
        users[0].nick.should.be.equal("xxx");
    });
});






*/
