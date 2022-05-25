import styles from './Button.module.css';

function Button({text, to, customClass}){
    return(
        <button
            type="submit"
            name={text}
            className={`${styles[customClass]}`}
        >
            
            {text}
        
        </button>
    );
}

export default Button;