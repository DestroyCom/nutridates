import {Link} from "react-router-dom";

import '../styles/Header.css'

function Header(){
    return (
        <header>
            <Link to='/'>Nutridates</Link>
            <Link to='/login'>MON ESPACE</Link>
        </header>
    )
}

export default Header;