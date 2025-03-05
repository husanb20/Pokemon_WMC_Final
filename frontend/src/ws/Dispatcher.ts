import {IMessage} from "../models/IMessage.ts";
import {useAppStore} from "./AppStore.ts";
import {IUser} from "../models/IUser.ts";
import {ITrainer} from "../models/ITrainer.ts";

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