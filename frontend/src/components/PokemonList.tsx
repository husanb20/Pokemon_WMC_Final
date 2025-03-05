import {useAppStore} from "../ws/AppStore.ts";
import {useState} from "react";


const PokemonList = () => {
    const {trainers} = useAppStore();
    const [type, setType] = useState<string>('');

    const pokemonTypes: string[] = [
        "Pflanze",
        "Wasser",
        "Elektro",
        "Feuer"
    ]

    const filteredPokemon = trainers.map(trainer => ({
            ...trainer,
            pokemonListe: trainer.pokemonListe.filter(p =>
                p.typ === type || type === ''
            )
        }
    ))

    return (

        <div>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value={""}>Alle Typen</option>
                {pokemonTypes.map(type => (
                    <option>{type}</option>
                ))}
            </select>

            <table>
                <thead>
                <tr>
                    <td>Trainername</td>
                    <td>Pokemon</td>
                    <td>Level</td>
                    <td>Typ</td>
                    <td>Status</td>
                </tr>
                </thead>

                <tbody>
                {filteredPokemon.map(t => (
                    t.pokemonListe.map(p => (
                        <tr>
                            <td>{t.name}</td>
                            <td>{p.name}</td>
                            <td>{p.level}</td>
                            <td>{p.typ}</td>
                            <td>{p.status}</td>
                        </tr>
                    ))
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PokemonList;