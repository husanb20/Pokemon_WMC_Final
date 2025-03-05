export interface IPokemon {
    name: string;
    level: number;
    typ: string;
    status: string;
}

export interface ITrainer {
    name: string;
    pokemonListe: IPokemon[];
}
