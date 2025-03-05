import {OPEN, WebSocket} from "ws";
import {IUser, TRole} from "../models/IUser";
import {AppLogic} from "../services/AppLogic";
import Dispatcher from "./Dispatcher";
import {IMessage} from "../models/IMessage";
import {createSocket} from "node:dgram";

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