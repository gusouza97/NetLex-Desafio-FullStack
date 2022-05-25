import style from "./Sidebar.module.css";

import { NavLink } from 'react-router-dom';

function Sidebar(){

    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? 'white' : '',
            color: isActive ? '#000' : 'white'
        }
    }

    return(
        <aside>
            <ul className={style.list_menu}>
                <li><NavLink to="/user/wordfrequency" style={navLinkStyles}>Método 1</NavLink></li>
                <li><NavLink to="/user/wordsentences" style={navLinkStyles}>Método 2</NavLink></li>
                <li><NavLink to="/user/topwords" style={navLinkStyles}>Método 3</NavLink></li>
            </ul>
        </aside>
    );
}

export default Sidebar;