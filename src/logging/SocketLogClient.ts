import {ILoggable} from "./ILoggable";
import {LogMessage} from "./LogMessage";
import Socket = SocketIOClient.Socket;
import * as _ from "lodash";

export class SocketLogClient implements ILoggable {


    //private throttledLog:any;
    private _socket:Socket;

    constructor(socket:Socket, private addConsole:boolean) {
        //this.throttledLog = _.throttle(this.emit, 2000);
        this._socket=socket;
    }

    debug(message:LogMessage) {
        this.throttledLog(this._socket, "debug", message);
    }

    info(message:LogMessage) {
        this.throttledLog(this._socket, "info", message);
    }

    error(message:LogMessage) {
        this.throttledLog(this._socket, "error", message);
    }

    warn(message:LogMessage) {
        this.throttledLog(this._socket, "warn", message);
    }


    private throttledLog(socket:Socket, level:string, msg:LogMessage) {
        let o = {level: level, message: JSON.stringify(msg)};
        socket.emit("_log", o);
        if (this.addConsole) console.log(level+": "+JSON.stringify(msg));
    }

}