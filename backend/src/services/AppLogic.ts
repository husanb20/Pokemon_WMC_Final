import {WSHandler} from "../ws/WSHandler";
import {IUser} from "../models/IUser";
import {WebSocket} from "ws";
import {trainerListe_mockdata} from "../mockdata/pokemonTrainer_mock"

//innerhalb der app logic passiert alles wichtige, sprich wenn eine Nachricht aus dem Frontend kommt, wird diese im Dispatcher verarbeitet und dieser ruft dann
//eine der unteren Funktionen auf, damit auch wirklich was passiert
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

    //einmal haben wir das login, bei dem wir eben die login funktion im handler aufrufen bei dem ein user zur connection gesetzt wird, und dann schicken wir ans frontend ebenfalls eine Login message, mit dem user
    //als payload, damit im Frontend der richtige eingeloggte user gesetzt wird. Sprich wir schicken einmal vom frontend eine "LOGIN" message ans backend, damit der richtige user gesetzt wird & damit wir
    //dann daten im frontend sehen können, schicken wir einmal eine LOGIN message mit dem user zurück, und die TRAINER_LIST message mit den daten, damit im Frontend die trainerliste mit allen trainer bzw pokemon daten
    //gespeichert  & angezeigt werden kann.
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


    //die user list wird aufgerufen beim Login, damit die eingeloggten user im frontend gespeichert werden können im appstore
    handleUserList() {
        this.wsHandler.sendToAll({type: "USER_LIST", payload: this.wsHandler.getUsers()});
    }
}