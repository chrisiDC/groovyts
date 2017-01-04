/*
import {Utils} from "../Utils";
var winston = require("winston");
import * as Colors from "colors";

export class WinstonConsole {
    public static create() {
        return new (winston.transports.Console)(
            {
                json: false,
                colorize: false,
                formatter: (options)=> {
                    return this.format(options)
                },
                timestamp: function () {
                    return Date.now();
                }


            });
    }

    private static format = (options):string=> {
        let header = "";
        let timeStamp = "["+ Utils.getISOTime()+"]";

        
        if (options.meta && options.meta.origin === "clientlogger") header = Colors.green("----------CLIENT:" + options.level + "----------");
        else header = Colors.white("----------SERVER:" + options.level + "----------");

        let formattedString = header + "\n" + timeStamp +" " + (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );

        if (options.level === "debug") return Colors.gray(formattedString);
        else if (options.level === "error") return Colors.red(formattedString);
        if (options.level === "warning") return Colors.yellow(formattedString);
        if (options.level === "info") return Colors.white(formattedString);
        else return Colors.white(formattedString);


    }

}

*/
