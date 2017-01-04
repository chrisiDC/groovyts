import {ObjectID} from "mongodb";
import {MongoClient} from "mongodb";
import {Db} from "mongodb";
let config = require("./test.config.json");
import {expect} from "chai";
import {MongoSimple} from "./MongoSimple";


class User {
    constructor(nick: string, password: string) {
        this.nick = nick;
        this.password = password;
    }

    _id: ObjectID;
    nick: string;
    password: string;
}

describe('test mongosimple class', function () {

    let db: Db;
    let collection = "_unittest_users";
    let id: ObjectID;
    before((done) => {
        MongoClient.connect(config.database, (err, _db) => {
            if (err) {
                done(err);
            }
            db = _db;
            done();
        });
    });

    it('should insert a document', function (done) {
        new MongoSimple(db).insert("users", new User("test", "test")).then((result: User) => {

            expect(result).to.exist;
            expect(result._id).to.exist;
            expect(result._id.toString().length).to.be.above(0);
            id = result._id;
            done();
        })
            .fail((error) => done(error));

    });

    it('get the inserted a document', function (done) {
        new MongoSimple(db).find("users", {_id: id}, 1).then((result: Array<User>) => {
            expect(result).to.exist;
            expect(result.length).to.eql(1);
            expect(result[0]._id.toString()).to.eql(id.toString());
            done();
        })
            .fail((error) => done(error));

    });

    it('update a document', function (done) {
        new MongoSimple(db).update("users", {_id: id}, {nick: "nickB"}).then(() => {
            new MongoSimple(db).find("users", {_id: id}, 1).then((result: Array<User>) => {
                expect(result).to.exist;
                expect(result.length).to.eql(1);
                expect(result[0].nick).to.eql("nickB");
                done();
            })
                .fail((error) => done(error));
        })
            .fail((error) => done(error));

    });

    it('delete the document', function (done) {
        new MongoSimple(db).delete("users", id.toString()).then(() => {
            new MongoSimple(db).find("users", {_id: id}, 1).then((result: Array<User>) => {
                expect(result.length).to.eql(0);
                done();
            })
                .fail((error) => done(error));
        })
            .fail((error) => done(error));

    });

});






