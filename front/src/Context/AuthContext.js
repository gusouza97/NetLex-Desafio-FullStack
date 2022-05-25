import React, {createContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const Context = createContext();

function AuthProvider({ children }){

    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if(token) {
            setAuthenticated(true);
        }

        if(!token){
            setAuthenticated(false);
            navigate("/");
        }

    }, []);

    async function handleLogin(e){

        e.preventDefault();

        await fetch('http://localhost:3035/users/login', {
            mode: 'cors',
            method: "POST",
            headers: {
              "Origin": "http://localhost:3000",
              "Content-Type": "application/json",
              "Accept": 'application/json',
              "Authorization": ""
            },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        })
        .then((res) => {
            const data = res.json()
            return data;
        })
        .then((data) => {

            if(data !== null && data.hasOwnProperty("error")){
                localStorage.removeItem('token');
                setAuthenticated(false);
                navigate("/", {state: {message: data.error}});
                return;
            }

            localStorage.setItem('token', data.token);
            setAuthenticated(true);
            navigate("/user/wordfrequency");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <Context.Provider value={{ authenticated, handleLogin }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };