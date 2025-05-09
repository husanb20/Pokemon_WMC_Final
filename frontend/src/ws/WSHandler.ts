import {useAppStore} from "./AppStore.ts";
import Dispatcher from "./Dispatcher.ts";
import {IMessage} from "../models/IMessage.ts";

//im WSHandler stellen wir die WEbSocket verbindung zum backend her in handleConnection, und auch hier passieren wieder die sachen wie den SetConnected State zu setzen & ganz wichtig,
//das verarbeiten der messages. Sprich wenn unser socket eine nachricht aus dem backend bekommt (this.socket.onmessage), geben wir sie unserem Dispatcher weiter, der sie dann verarbeitet und die Sachen dementsprechend im appStore speichert
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