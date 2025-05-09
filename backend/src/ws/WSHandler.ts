import {OPEN, WebSocket} from "ws";
import {IUser, TRole} from "../models/IUser";
import {AppLogic} from "../services/AppLogic";
import Dispatcher from "./Dispatcher";
import {IMessage} from "../models/IMessage";
import {createSocket} from "node:dgram";

//der WSHandler macht quasi alles WebSocket mäßige sprich, wenn Nachrichten vom Frontend kommen ruft er den Dispatcher auf (socket.on message), und wenn die Verbindung also das browserfenster geschlossen wird,
//löscht er die Connection dieses users.
//weiters werden hier Messages versendet an ein oder mehrere Sockets (also an nur einen oder alle derzeit verbundenen user) und auch das login passiert hier, wo wir für eine connection den richtigen eingeloggten user
//setzen (login). Zusätzlich gibt es das getUser / getUsers was dazu da is, damit der admin alle eingeloggten user sehen kann (also sprich unsere connections die derzeit bestehen)
export class WSHandler {
    private readonly connections: Map<WebSocket, IUser | undefined>;

    constructor(connections: Map<WebSocket, IUser | undefined>) {
        this.connections = connections;
    }

    setupHandler(socket: WebSocket) {
        socket.on("message", (msg:string) => {
            Dispatcher.dispatch(JSON.parse(msg), socket);
        })

        socket.on("close", () => {
            this.connections.delete(socket);
            //this.handleTrainerList();
        })
    }

    sendToAll(message: IMessage, role?: TRole) {
        this.connections.forEach((user, socket) => {
            this.sendMessage(socket, message);
        })
    }

    sendMessage(socket: WebSocket, message: IMessage) {
        if(socket.readyState === OPEN){
            socket.send(JSON.stringify(message));
        }
    }

    login(socket: WebSocket, user: IUser | undefined) {
        if(socket.readyState === WebSocket.OPEN){
            this.connections.set(socket, user);
        }
    }

    getUser(socket: WebSocket) {
        return this.connections.get(socket);
    }

    getUsers() {
        return [...this.connections.values()]
            .filter(c => c !== undefined);
    }
}