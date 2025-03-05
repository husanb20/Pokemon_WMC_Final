
import {useAppStore} from "../ws/AppStore.ts";
import Auth from "../components/Auth.tsx";
import PokemonList from "../components/PokemonList.tsx";


const Dashboard = () => {
    const {isConnected, user} = useAppStore();

    return (
        <div>
            <h2>Willkommen im Pokemon Labor von Professor Eich!</h2>
            <h3>Du bist eingeloggt als: {user?.name}</h3>
            <h4>Wähle einen Benutzer zum einloggen:</h4>
            <Auth/>
            {user && <PokemonList/>}
        </div>
    );
};

export default Dashboard;