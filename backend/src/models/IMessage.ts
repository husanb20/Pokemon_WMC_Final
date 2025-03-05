import {IUser} from "./IUser";
import {ITrainer} from "./ITrainer";

export type TType = "LOGIN" | "LOGOUT" | "TRAINER_LIST" | "USER_LIST";
export type TPayload = | IUser | string | IUser[] | ITrainer[];

export interface IMessage {
    type: TType;
    payload?: TPayload;
}