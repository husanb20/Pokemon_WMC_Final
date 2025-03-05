import {create} from "zustand";
import {IUser} from "../models/IUser.ts";
import {ITrainer} from "../models/ITrainer.ts";

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