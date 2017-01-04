import {LogMessage} from "../../logging/LogMessage";
import Socket = SocketIOClient.Socket;
import {ISocketLogService} from "./ISocketLogService.angular";
import {SocketLogClient} from "../../logging/SocketLogClient";

export class SocketLogService implements ISocketLogService{
    
    private logClient:SocketLogClient;
    
    public init = (LogSocket:Socket):void=> {
        this.logClient = new SocketLogClient(LogSocket, true);
    };
    
    debug=(message:LogMessage)=> {
        if (this.logClient) this.logClient.debug(message);
    }

    info=(message:LogMessage)=> {
        if (this.logClient) this.logClient.info(message);
    }

    error=(message:LogMessage)=> {
        if (this.logClient) this.logClient.error(message);
    }

    warn=(message:LogMessage)=> {
        if (this.logClient) this.logClient.warn(message);
    }

}
