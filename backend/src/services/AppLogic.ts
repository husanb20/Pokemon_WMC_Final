import {WSHandler} from "../ws/WSHandler";
import {IUser} from "../models/IUser";
import {WebSocket} from "ws";
import {trainerListe_mockdata} from "../mockdata/pokemonTrainer_mock"

export class AppLogic {
    private static instance: AppLogic;

    private constructor(private wsHandler: WSHandler) {
    }

    public static getInstance(newWsHandler?: WSHandler) {
        if(!AppLogic.instance && newWsHandler){
            AppLogic.instance = new AppLogic(newWsHandler);
        }

        return this.instance;
    }

    handleLogin(user: IUser, socket: WebSocket) {
        this.wsHandler.login(socket, user);
        this.wsHandler.sendMessage(socket, {type: "LOGIN", payload: user}); //ans frontend dass er jetzt eingefügt
        this.handleUserList();

        //handleTrainersList
        let payload;

        if(user.role === "Trainer"){
            payload = trainerListe_mockdata.filter(t => t.name === user.name);
        } else {
            payload = trainerListe_mockdata;
        }

        this.wsHandler.sendMessage(socket, {type: "TRAINER_LIST", payload: payload})
    }

    handleLogout(socket: WebSocket) {
        this.wsHandler.login(socket, undefined);
        this.handleUserList();
    }


    handleUserList() {
        this.wsHandler.sendToAll({type: "USER_LIST", payload: this.wsHandler.getUsers()});
    }
}