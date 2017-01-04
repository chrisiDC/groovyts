import {Db} from "mongodb";
import {MongoError} from "mongodb";
import {IDbSimple} from "./IDbSimple";
import {Promise} from "q";
import * as q from "q";
import {ObjectID} from "mongodb";

//todo: async version of mongo driver?
export class MongoSimple implements IDbSimple {

    constructor(private db: Db) {

    }


    find(entity: string, filter: any, limit: number): Promise<Array<Object>> {
        let deferred = q.defer<Array<Object>>();
        setTimeout(()=> {
            this.db.collection(entity).find(filter).limit(limit).toArray((err: MongoError, docs:Array<Object>)=> {
                if (err) deferred.reject(err);
                else deferred.resolve(docs);
            });
        }, 0);

        return deferred.promise;
    }

    update(entity: string, filter: any, set: any): Promise<void> {

        let deferred = q.defer<void>();
        setTimeout(()=> {
            this.db.collection(entity).updateOne(filter, {$set: set}, {
                upsert: true
            }, (error: MongoError) => {
                if (error) deferred.reject(error);
                else deferred.resolve();
            });
        }, 0);

        return deferred.promise;
    }

    insert(collection: string, document: Object): Promise<Object> {
        let deferred = q.defer<Object>();
        setTimeout(()=> {
            this.db.collection(collection).insertOne(document, (error: MongoError,doc:Object) => {
                if (error) deferred.reject(error);
                else deferred.resolve(document);
            });
        }, 0);

        return deferred.promise;
    }

    delete(collection: string, id: string): Promise<void> {
        let deferred = q.defer<void>();
        setTimeout(()=> {
            this.db.collection(collection).deleteOne({_id:new ObjectID(id)},(err: MongoError)=> {
                if (err) deferred.reject(err);
                else deferred.resolve();
            });
        }, 0);

        return deferred.promise;
    }

}