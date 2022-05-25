import style from './FormMethod.module.css';

import Button from '../Button/Button';
import Input from '../Input/Input';

function FormMethod({handleOnChange, handleOnSubmit}){
    return(
        <div className={style.display_method}>
            <form onSubmit={handleOnSubmit}>
                <label>Digite uma palavra</label>
                <Input
                    customClass="input_extralarge"
                    name="method"
                    type="text"
                    placeholder=""
                    handleOnChange={handleOnChange}
                />

                <Button text="Verificar" customClass="btn_small"/>
            </form>
        </div>
    );
}

export default FormMethod;