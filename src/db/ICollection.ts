import {Promise} from "q";
import {StoredDocument} from "./StoredDocument";

export interface ICollection<T extends StoredDocument> {
    get(filter: any,limit:number): Promise<Array<T>>;
    getById(id: string): Promise<T>;
    insert(document: T): Promise<T>;
    delete(id: string): Promise<void>;
    update(document:T):Promise<void>;
    updateAll(filter:any, set: any): Promise<void>;
    updateById(id:string, set: any): Promise<void>;
}
