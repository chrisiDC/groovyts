var postal = require("postal");
var channel = postal.channel("global");
import {IPubSub} from "./IPubSub";

export class PostalPubSub implements IPubSub {


    publish(topic: string, data: any): void {
        channel.publish(topic, data);
    }

    subscribe(topic: string, callback: (data: any)=>void): any {
        return channel.subscribe(topic, callback);
    }

    unsubscribe(handle: any): void {
        handle.unsubscribe();
    }

    error(reason: any): void {
        channel.publish("system", {type: "error", data: reason});
    }

    info(msg: any): void {
        channel.publish("system", {type: "info", data: msg});
    }


}