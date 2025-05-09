import {IMessage} from "../models/IMessage.ts";
import {useAppStore} from "./AppStore.ts";
import {IUser} from "../models/IUser.ts";
import {ITrainer} from "../models/ITrainer.ts";

//Hier haben wir wieder unseren Dispatcher bei dem Nachrichten verarbeitet werden. Ein User Loggt sich beispielsweise ein, schickt eine LOGIN nachricht ans backend, und dieser Login vorgang im backend, schickt wie du vorher gesehen hast
// auch wieder eine LOGIN nachricht mit dem richtigen user zurück. Dadurch wird hier der LOGIN case ausgeführt, damit wir den user im frontend speichern könne & die daten anhand des richtig users anzeigen können
// wie du vorhin gesehen hast werden beim LOGIN vorgang im backend auch user_list und trainer_list nachrichten verschickt, damit wir unsere eingeloggten user und trainer/pokemon daten hier im frontend speichern können -> die
// werden im appStore gespeichert wie du siehst, und somit können wir sie dann im frontend anzeigen, je nach eingellogtem user da wir im backend die daten ja nach usernamen filtern kriegen wir auch nur die zurück,
//für den user der gerade eingeloggt ist
class Dispatcher {
    static dispatch(message: IMessage) {
        switch (message.type) {
            case "LOGIN":
                useAppStore.getState().setUser(message.payload as IUser);
                break;
            case "LOGOUT":
                useAppStore.getState().setUser(undefined);
                break;
            case "USER_LIST":
                useAppStore.getState().setUsers(message.payload as IUser[]);
                break;
            case "TRAINER_LIST":
                useAppStore.getState().setTrainers(message.payload as ITrainer[]);
                break;
        }
    }
}

export default Dispatcher;