import {create} from "zustand";
import {IUser} from "../models/IUser.ts";
import {ITrainer} from "../models/ITrainer.ts";

//App Store ist denke ich klar, hier drin wird alles gespeichert was aus dem Backend per WebSocket messages ankommt, damit man es überall auf der client Seite verwenden kann
interface AppStore {
    isConnected:boolean;
    user: IUser | undefined;
    users: IUser[];
    trainers: ITrainer[];
    setIsConnected:(isConnected:boolean) => void
    setUser: (user:IUser | undefined) => void;
    setUsers: (users:IUser[]) => void;
    setTrainers: (trainers:ITrainer[]) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    isConnected:false,
    user: undefined,
    users: [],
    trainers: [],
    setIsConnected:(isConnected:boolean) => set({isConnected}),
    setUser: (user:IUser | undefined) => set({user}),
    setUsers: (users:IUser[]) => set({users}),
    setTrainers: (trainers:ITrainer[]) => set({trainers}),
}));