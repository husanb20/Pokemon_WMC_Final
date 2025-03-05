export type TRole = "Trainer" | "Professor";

export interface IUser {
    role: TRole;
    name: string;
}