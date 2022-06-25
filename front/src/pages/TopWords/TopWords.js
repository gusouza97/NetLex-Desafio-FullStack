import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button/Button";

import Container from "../../components/Container/Container";
import Select from "../../components/Select/Select";
import Sidebar from "../../components/Sidebar/Sidebar";
import Title from "../../components/Title/Title";

import style from "./TopWords.module.css";

function TopWords(){

    const [data, setData] = useState();
    const [token, setToken] = useState();
    const [count, setCount] = useState();
    const [minWordLength, setMinWordLength] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    function handleOnChangeCount(e){
        setCount(e.target.value);
    }

    function handleOnChangeMinWordLength(e){
        setMinWordLength(e.target.value);
    }

    function getData(e){

            e.preventDefault();

            if(!count){
                return false
            }

            if(!minWordLength){
                return false
            }

            fetch('http://localhost:3086/documents/top-words', {
                mode: 'cors',
                method: "POST",
                headers:{
                    "Origin": "http://localhost:3001",
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    count: count,
                    minWordLength: minWordLength
                })
            })
            .then((res) => res.json())
            .then((res) => {

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
                    
                    <Title text="Método 3"/>
                    <div className={style.display_method}>
                        <form onSubmit={getData}>
                            <div className={style.row}>
                                <div className={style.selectInput}>
                                    <label>Count</label>
                                    <Select name="count" handleChange={handleOnChangeCount}/>
                                </div>
                                <div className={style.selectInput}>
                                    <label>Minimum Word Length</label>
                                    <Select name="minWordLength" handleChange={handleOnChangeMinWordLength}/>
                                </div>
                            </div>
                            <Button text="Verificar" customClass="btn_small"/>
                        </form>
                    </div>

                    {data && 
                        <div className={style.display_result}>
                            <ul>
                                {Array.isArray(data) && data.map((value, index) => <li key={index}>{data[index][0]} - <b>{data[index][1]}</b> ocorrências no texto.</li>)}
                            </ul>
                        </div>
                    }

                </div>
            </Container>   

        </Container>
    );
}

export default TopWords;