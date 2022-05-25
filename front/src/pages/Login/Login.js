import { useLocation } from 'react-router-dom';

import Container from "../../components/Container/Container";
import FormLogin from "../../components/FormLogin/FormLogin";
import FlashMessage from '../../components/FlashMessage/FlashMessage';

import style from "./Login.module.css";

import { useContext } from "react";
import { Context } from '../../Context/AuthContext'

function Login(){
    const { handleLogin } = useContext(Context);

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state.message;
    }

    return(
        <div className={style.display_login}>
            <Container
                center = "container_center" 
            >
                <FormLogin handleLogin={handleLogin} />
                
            </Container>
            
            { message && 
                <FlashMessage msg={message}/>
            }
           
        </div>
    )
}

export default Login;