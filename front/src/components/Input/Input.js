import style from "./Input.module.css";

function Input({name, type, placeholder, handleOnChange, value, customClass}){
    return(
        <input
            className={customClass}
            name={name}
            id={name}
            type={type}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
        />
    );
}
export default Input;