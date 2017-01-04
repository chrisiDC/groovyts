import {ISocket} from "./ISocket";
import Socket = SocketIO.Socket;
import Namespace = SocketIO.Namespace;

export class ServerSocket implements ISocket {

    constructor(private ns: Namespace) {

    }

    emit(event:string,data: any, to?: string): void {
        if (to) this.ns.to(to).emit(event,data);
        else this.ns.emit(event,data);
    }

    broadcast(event:string,data: any, to?: string): void {
        throw new Error("not implemented");
    }
}