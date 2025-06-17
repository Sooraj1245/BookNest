import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"



export default function Card(){
    return(
        <div className="card-container">
            <div className="card-img-container">
                <img src="../src/assets/fiction.jpg"/>
            </div>
            <div className="card-text-container">
                <h3>Book Name</h3>
                <p>Famous book</p>
                <FontAwesomeIcon icon={faHeart}/>
            </div>
            
        </div>
    )
}



