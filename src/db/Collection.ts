
import {IDbSimple} from "./IDbSimple";
import * as Q from "q";
import {Promise} from "q";
import {MongoError} from "mongodb";
import {Db} from "mongodb";
import {MongoSimple} from "./MongoSimple";
import {ICollection} from "./ICollection";
import {ObjectID} from "mongodb";
import {StoredDocument} from "./StoredDocument";

export class Collection<T extends StoredDocument> implements ICollection<T> {
    private db: IDbSimple;

    constructor(private _db: Db, private collection: string) {
        this.db = new MongoSimple(_db);
    }

    get(filter: any): Promise<Array<T>> {

        let deferred = Q.defer<Array<T>>();
        this.db.find(this.collection, filter, 1)
            .then((results: Array<T>)=> {
                //noinspection TypeScriptValidateTypes
                deferred.resolve(results);
            })
            .fail((error: MongoError)=> {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    getById(id: string): Promise<T> {
        let deferred = Q.defer<T>();
        this.db.find(this.collection, {_id: new ObjectID(id)}, 1)
            .then((results: Array<T>)=> {
                deferred.resolve(results[0]);
            })
            .fail((error: MongoError)=> {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    insert(document: T): Promise<T> {
        let deferred = Q.defer<T>();
        this.db.insert(this.collection, document)
            .then((result: T)=> {
                deferred.resolve(result);
            })
            .fail((error: MongoError)=> {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    delete(id: string): Promise<void> {
        let deferred = Q.defer<void>();
        this.db.delete(this.collection, id)
            .then(()=> {
                deferred.resolve();
            })
            .fail((error: MongoError)=> {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    update(document:T): Promise<void> {
        let deferred = Q.defer<void>();
        this.db.update(this.collection, {_id:document._id}, document)
            .then(()=> {
                deferred.resolve();
            })
            .fail((error: MongoError)=> {

                deferred.reject(error);
            });

        return deferred.promise;
    }

    updateAll(filter: any, set: any): Promise<void> {
        let deferred = Q.defer<void>();
        this.db.update(this.collection, filter, set)
            .then(()=> {
                deferred.resolve();
            })
            .fail((error: MongoError)=> {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    updateById(id: string, set: any): Promise<void> {
        let deferred = Q.defer<void>();
        this.db.update(this.collection, {_id: new ObjectID(id)}, set)
            .then(()=> {
                deferred.resolve();
            })
            .fail((error: MongoError)=> {
                deferred.reject(error);
            });

        return deferred.promise;
    }

}