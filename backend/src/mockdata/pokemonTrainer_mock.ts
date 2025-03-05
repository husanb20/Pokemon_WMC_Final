import { ITrainer } from "../models/ITrainer";

export const trainerListe_mockdata: ITrainer[] = [
    {
        name: "trainer1",
        pokemonListe: [
            { name: "Pikachu", level: 15, typ: "Elektro", status: "Gesund" },
            { name: "Glumanda", level: 20, typ: "Feuer", status: "Verletzt" },
        ],
    },
    {
        name: "trainer2",
        pokemonListe: [
            { name: "Bisasam", level: 12, typ: "Pflanze", status: "Gesund" },
            { name: "Schiggy", level: 18, typ: "Wasser", status: "Gesund" },
        ],
    },
];
