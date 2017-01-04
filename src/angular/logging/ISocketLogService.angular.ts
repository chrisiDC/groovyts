import Socket = SocketIOClient.Socket;
import {ILoggable} from "../../logging/ILoggable";


export interface ISocketLogService extends ILoggable{
    
    init (LogSocket:Socket);

}
