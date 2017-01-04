import {JSONSerializer} from "./JSONSerializer";
import {Mappable} from "./Mappable";

export interface Entity<T> extends Mappable<T> {

    map(): T;
    fromJSON(o: any): Entity<T>;

}