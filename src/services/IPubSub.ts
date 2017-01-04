export interface IPubSub
{
    publish(topic:string,data:any):void;
    subscribe(topic:string,callback:(data:any)=>void):any;
    unsubscribe(handle:any):void;
    error(reason:any):void;
    info(reason:any):void;
}