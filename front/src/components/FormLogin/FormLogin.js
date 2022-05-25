// Style
import style from "./FormLogin.module.css"

// Components
import Input from "../Input/Input";
import Button from "../Button/Button"

function FormLogin({handleLogin}){
    return(
        <form onSubmit={handleLogin}>
            <div className={style.form_title}>
                <h1>Login</h1>
            </div>
            <div className={style.form_body}>
                <div className={style.form_field}>
                    <label>E-mail:</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        customClass="input_medium"
                    />
                </div>

                <div className={style.form_field}>
                    <label>Senha:</label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Digite sua senha"
                        customClass="input_medium"
                    />
                </div>

                <div className={style.form_btn}>
                    <Button
                        text="Entrar"
                        customClass="btn_large"
                    /> 
                </div>
            </div>
        </form>
    );
}

export default FormLogin;