import {useAppStore} from "./AppStore.ts";
import Dispatcher from "./Dispatcher.ts";
import {IMessage} from "../models/IMessage.ts";

class WSHandler {
    private socket: WebSocket | undefined = undefined;

    constructor() {
        this.handleConnection();
    }

    handleConnection() {
        this.socket = new WebSocket("ws://localhost:8080");

        this.socket.onopen = () => {
            useAppStore.getState().setIsConnected(true);
        }

        this.socket.onclose = () => {
            useAppStore.getState().setIsConnected(false);
        }

        this.socket.onmessage = (event) => {
            const msg:IMessage = JSON.parse(event.data);
            Dispatcher.dispatch(msg);
        }
    }

    sendMessage(message: IMessage): void {
        this.socket?.send(JSON.stringify(message));
    }
}

export default new WSHandler();