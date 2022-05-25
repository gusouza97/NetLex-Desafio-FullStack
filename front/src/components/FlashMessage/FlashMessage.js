import { useEffect, useState } from "react";

import style from "./FlashMessage.module.css";

function FlashMessage({msg}){

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if(!msg) {
            setVisible(false);
            return
        }

        setVisible(true);
        
        const timer = setTimeout(() => {
            setVisible(false);
        }, 6000);

        return () => clearTimeout(timer);

    }, [msg]);

    function closeMessage(){
        setVisible(false);
    }

    return(
        <>
            {visible && (
                <div className={style.message}>
                        {msg}
                    <div onClick={closeMessage} className={style.closeMessage}>X</div>
                </div>
            )}
        </>  
    );
}

export default FlashMessage;