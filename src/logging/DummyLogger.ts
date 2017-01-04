import {ILoggable} from "./ILoggable";
import {LogMessage} from "./LogMessage";
export class DummyLogger implements  ILoggable
{
    debug(message:LogMessage) {
    }

    info(message:LogMessage) {
    }

    error(message:LogMessage) {
    }

    warn(message:LogMessage) {
    }
    

}
