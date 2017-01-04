
import {LoggerInstance} from "winston";
import {LogMessage} from "./LogMessage";
import {ILoggable} from "./ILoggable";

export class WinstonLogger implements ILoggable {
    private winston:LoggerInstance;

    constructor(winston:LoggerInstance) {

        this.winston = winston;

    }
    public debug (message:any):void {

        this.winston.log("debug", JSON.stringify(message));

    };

    public info(message:any):void {

        this.winston.log("info",  JSON.stringify(message));

    };

    public error (message:any):void {

        if (message instanceof Error) this.winston.log("error",  message.stack);
        else this.winston.log("error",  JSON.stringify(message));

    };

    public warn (message:any):void {

        this.winston.log("warn",  JSON.stringify(message));

    }

}

