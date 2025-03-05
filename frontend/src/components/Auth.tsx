import {IUser} from "../models/IUser.ts";
import {users_mockdata} from "../mockdata/dummyusers_mockdata.ts";
import WSHandler from "../ws/WSHandler.ts";
import {useState} from "react";

const Auth = () => {
    const [selectedUser, setSelectedUser] = useState<IUser>()

    const handleLogin = (user:IUser) => {
            WSHandler.sendMessage({
                type: "LOGIN",
                payload: selectedUser
            })
    }

    return (
        <div>
            <select onChange={(e) => setSelectedUser(users_mockdata.find(user => user.name === e.target.value))}>
                <option>Wähle einen user</option>
                {users_mockdata.map(u => (
                    <option>{u.name}</option>
                ))}
            </select>

            <button onClick={() => handleLogin(selectedUser)}>Login</button>
        </div>
    );
};

export default Auth;