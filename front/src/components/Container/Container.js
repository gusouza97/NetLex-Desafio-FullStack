import style from './Container.module.css';

function Container({children, direction, center}){
    return(
        <div className={`${style.container} ${style[direction]} ${style[center]}`}>
            {children}
        </div>
    );
}

export default Container;