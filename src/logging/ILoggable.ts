
import {LogMessage} from "./LogMessage";
export interface ILoggable
{
    debug(message:any);
    info(message:any);
    error(message:any);
    warn(message:any);

}