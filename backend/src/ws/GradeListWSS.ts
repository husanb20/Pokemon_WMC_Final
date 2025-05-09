import {WebSocket, WebSocketServer} from "ws";
import {WSHandler} from "./WSHandler";
import {IUser} from "../models/IUser";
import {AppLogic} from "../services/AppLogic";

//Das is unser WebSocketServer, sprich hier Initialisieren wir alles und machen sobald ein client im frontend einen browser tab aufmacht eine neue connection -> zuerst mit user undefined, weil er noch nicht eingeloggt ist /siehe setUpConnection
export class GradeListWSS {
    private readonly wss: WebSocketServer;
    private readonly wsHandler: WSHandler;
    private readonly connections: Map<WebSocket, IUser | undefined> = new Map();
    private readonly appLogic: AppLogic;


    constructor(readonly port?: number) {
        this.wss = new WebSocketServer({port: 8080});
        this.wsHandler = new WSHandler(this.connections);
        this.appLogic = AppLogic.getInstance(this.wsHandler);
        this.setupConnection();
    }

    private setupConnection() {
        this.wss.on("connection", (ws) => {
            this.connections.set(ws, undefined);
            this.wsHandler.setupHandler(ws);
        })
    }
}