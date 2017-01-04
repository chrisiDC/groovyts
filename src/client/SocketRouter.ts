import Socket = SocketIOClient.Socket;
import postal =require("postal");
import * as io from "socket.io-client";
import * as Q from "q";
import {Promise} from "q";
import {IPubSub} from "../services/IPubSub";


export class SocketRouter {

    private socket: Socket;
    private initiallyConnected:boolean=false;

    constructor(private dataTopic: string, private statusTopic: string, private serverUrl: string, private pubSub: IPubSub) {

    }

    connect = (): Promise<void>=> {

        setTimeout(()=>{
            if (!this.initiallyConnected) deferred.reject("could not connect to socket server");
        },5000);
        let deferred = Q.defer<void>();

        this.socket = io(this.serverUrl, {reconnection: true});

        //todo promises: detect timeout!
        this.socket.on('connect', ()=> {

            this.initiallyConnected = true;
            this.socket.on('connect_error', (error)=> this.pubSub.publish(this.statusTopic, {status: "connect_error"}));
            this.pubSub.publish(this.statusTopic, {status: "connection"});
            this.socket.on('msg', (data: any)=> {
                console.log(data);
                //this.pubSub.publish(this.dataTopic, data)
            });
            deferred.resolve();
        });




        this.socket.on('disconnect', () => {


            this.pubSub.publish(this.statusTopic, {status: "disconnect"});

        });

      /*  this._socket.on('sessionUpdate', (result: Array<void>)=> {


            /!* this.session = result[0].session;
             let event = result[0].event;

             if (this.session.gameFinished) {
             alert("game finished");
             }
             else {

             if (event.code === EventCode.PLAYERJOINED) {

             this.logService.debug(new LogMessage("Neuer Spieler am Tisch"));
             this.logService.debug(new LogMessage(event));
             }
             else if (event.code === EventCode.PLAYERLEFT) this.logService.debug(new LogMessage("Spieler hat den Tisch verlassen"));
             /!*else if (event.code === EventCode.GAMEFINISHED) this.info("Spiel beendet");*!/
             else if (this.session.captain === this.sessionStore.retrieve().player.id) {
             if (event.code === EventCode.CARDPLAYED) {
             if (this.session.roundFinished) {
             this.logService.debug(new LogMessage("round is finished"));

             this.$timeout(() => {
             this.socket.emit("applyTricks", {sessionId: this.session.id});
             }, this.simulatedTimeout);

             }
             else if (this.session.gameFinished) this.logService.debug(new LogMessage("game is finished"));
             else if (this.session.currentPlayerIsKI === true) {
             this.logService.debug(new LogMessage("triggering KI turn"));
             this.$timeout(() => {
             this.socket.emit("playKI", {sessionId: this.session.id});
             }, this.simulatedTimeout);

             }

             }

             else if (event.code === EventCode.ROUNDFINISHED) {
             this.logService.debug(new LogMessage("round finished event"));

             this.$timeout(() => {
             this.socket.emit("nextRound", {
             sessionId: this.session.id
             });
             }, this.simulatedTimeout);

             }
             else if (event.code === EventCode.NEWGAME) {
             if (this.session.currentPlayerIsKI === true) {
             this.logService.debug(new LogMessage("triggering KI turn"));
             this.socket.emit("playKI", {sessionId: this.session.id});
             }
             }
             else if (event.code === EventCode.NEXTROUND) {
             if (this.session.currentPlayerIsKI === true) {
             this.logService.debug(new LogMessage("triggering KI turn"));
             this.socket.emit("playKI", {sessionId: this.session.id});
             }
             }
             else  this.logService.warn(new LogMessage("event was not handled"));

             }
             else  this.logService.warn(new LogMessage("event was not handled"));
             }
             *!/
            this.pubSub.publish("sessionUpdate", result[0]);
        });*/

        return deferred.promise;
    }



}
