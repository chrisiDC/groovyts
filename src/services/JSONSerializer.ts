export interface JSONSerializer<T>
{
    fromJSON(o:any):T;

}