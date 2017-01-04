import {ObjectID} from "mongodb";
import {expect} from "chai";
import {MongoClient} from "mongodb";
import {Db} from "mongodb";
import {StoredDocument} from "./StoredDocument";
import {ICollection} from "./ICollection";
import {Collection} from "./Collection";
let config = require("./test.config.json");


class User extends StoredDocument {
    constructor(nick: string, password: string) {
        super();
        this.nick = nick;
        this.password = password;
    }

    nick: string;
    password: string;
}

describe('test collection class', function () {

    let db: Db;
    let collection = "_unittest_users";
    let users: ICollection<User>;
    let user: User;
    before((done)=> {
        MongoClient.connect(config.database, (err, _db)=> {
            if (err) {
                done(err);
            }
            db = _db;
            users = new Collection<User>(db, "users");
            done();
        });
    });

    it('should insert a document', function (done) {
        users.insert(new User("test", "test")).then((result: User)=> {
            user = result;
            expect(result).to.exist;
            expect(result._id).to.exist;
            expect(result._id.toString().length).to.be.above(0);
            done();
        })
            .fail((error)=>done(error));

    });

    it('get the inserted a document', function (done) {
        users.getById(user._id.toString()).then((result: User)=> {
            expect(result).to.exist;
            expect(result._id.toString()).to.eql(user._id.toString());
            done();
        })
            .fail((error)=>done(error));

    });

    it('update a document', function (done) {
        users.updateById(user._id.toString(), {nick: "nickB"}).then(()=> {
            users.getById(user._id.toString()).then((result: User)=> {
                expect(result).to.exist;
                expect(result.nick).to.eql("nickB");
                done();
            }).fail((error)=>done(error));
        }).fail((error)=>done(error));

    });

    it('delete the document', function (done) {
        users.delete(user._id.toString()).then(()=> {
            users.getById(user._id.toString()).then((result: User)=> {
                expect(result).to.not.exist;
                done();
            }).fail((error)=>done(error));
        }).fail((error)=>done(error));

    });

});






