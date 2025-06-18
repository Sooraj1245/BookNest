import { useNavigate } from "react-router-dom"




export default function Header(){
    const nav=useNavigate();
    function onClick(){
        nav("/")
    }
    return(
        <header>
            <h1 onClick={onClick}>Book<span style={{color:"var(--accent-text)"}}>Nest</span></h1>
                <nav>
                    <ul className="nav-list">
                        <li onClick={onClick} className="nav-items">Home</li>
                        <li className="nav-items">Favourites</li>
                        <li className="nav-items">Login</li>
                    </ul>
                </nav>
        </header>
    )
}