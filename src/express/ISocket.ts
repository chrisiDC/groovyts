export interface ISocket {
    emit(event:string,data: any,to?:string): void;
    broadcast(event:string,data:any,to?:string):void;

}