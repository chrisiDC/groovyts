import {Promise} from "q";


export interface IDbSimple {

    /*  findOne(entity:string,filter:any):Promise<Object>;*/
    find(collection: string, filter: any, limit: number): Promise<Array<Object>>;
    update(collection:string,document: Object, set: Object): Promise<void>;
    insert(collection:string,document:Object):Promise<Object>;
    delete(collection:string,document:Object)
}