import {IMessage} from "../models/IMessage";
import {AppLogic} from "../services/AppLogic";
import {WebSocket} from "ws";
import {IUser} from "../models/IUser";

//hier werden die Nachrichten die aus dem Frontend kommen verarbeitet, versteht sich glaub ich von selbst ^^
class Dispatcher {
    static dispatch(msg: IMessage, socket: WebSocket) {
        switch (msg.type) {
            case "LOGIN":
                AppLogic.getInstance().handleLogin(msg.payload as IUser, socket);
                break;
            case "LOGOUT":
                AppLogic.getInstance().handleLogout(socket);
                break;
        }
    }
}

export default Dispatcher;