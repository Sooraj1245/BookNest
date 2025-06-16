export default function Header(props){
    return(
        <header>
            <h1 onClick={props.function}>{props.logo}</h1>
            {!props.search?
                <nav>
                    <ul className="nav-list">
                        <li className="nav-items">Home</li>
                        <li className="nav-items">Favourites</li>
                        <li className="nav-items">Login</li>
                    </ul>
                </nav>
            :props.search}
        </header>
    )
}