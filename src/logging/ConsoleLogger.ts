import {ILoggable} from "./ILoggable";
import {LogMessage} from "./LogMessage";
export class ConsoleLogger implements  ILoggable
{
    debug(message:any) {
        console.log("debug");
        console.log(JSON.stringify(message));
    }

    info(message:any) {
        console.log("info");
        console.log(JSON.stringify(message));
    }

    error(message:any) {
        if (message instanceof Error) console.log(message.stack);
        else console.log(JSON.stringify(message));
    }

    warn(message:any) {
        console.log("warn");
        console.log(JSON.stringify(message));
    }

}
