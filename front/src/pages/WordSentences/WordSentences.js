import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import style from './WordSentences.module.css';

import Container from "../../components/Container/Container";
import Sidebar from "../../components/Sidebar/Sidebar";
import Title from "../../components/Title/Title";
import FormMethod from "../../components/FormMethod/FormMethod";

function TopWords(){

    const [data, setData] = useState();
    const [wordSearch, setWordSearch] = useState();
    const [token, setToken] = useState();
    const [value, setValue] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    function handleOnChange(e){
        setValue(e.target.value);
    }

    function getData(e){

            e.preventDefault();

            if(!value){
                return false
            }

            fetch('http://localhost:3035/documents/word-sentences', {
                mode: 'cors',
                method: "POST",
                headers:{
                    "Origin": "http://localhost:3000",
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    word: value,
                })
            })
            .then((res) => res.json())
            .then((res) => {
                
                setWordSearch(value);

                if(res !== null && res.hasOwnProperty("error")){
                    localStorage.removeItem('token');
                    navigate("/");
                    return;
                }

                if(res == null){
                    setData(false)
                }else{
                    setData(res);
                }
            })
            .catch((err) => console.log("Houve um erro " + err))
    }

    return(
        <Container direction="container_row">
            
            <Sidebar/>
            
            <Container direction="container_column">

                <div className={style.method}>

                <Title text="Método 2"/>
                    
                <FormMethod
                        handleOnChange={handleOnChange}
                        handleOnSubmit={getData}
                    />

                    {wordSearch && data && 
                        <div className={style.display_result}>
                            <p>A palavra <b>{wordSearch}</b> foi encontrada em {data.length} frases no texto.</p>

                            <ul>
                                {Array.isArray(data) && data.map((value, index) => <li key={index}>{index+1}. {value}</li>)}
                            </ul>
                        </div>
                    }

                    {wordSearch && data === false && 
                        <div className={style.display_result}>
                            <p>A palavra <b>{wordSearch}</b> foi encontrada em 0 frases no texto.</p>
                        </div>
                    }
                </div>
            </Container>   
        </Container>
    );
}

export default TopWords;