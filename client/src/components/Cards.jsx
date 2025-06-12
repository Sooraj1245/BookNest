import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"

function SkeletonLoad(){
    return (
        <div className="card-container">
            <div className="skeleton-img-container">

            </div>
            <div className="skeleton-text-container">

            </div>
        </div>
    )
}


export default function Card(){
    return(
        // <SkeletonLoad />
        <div className="card-container">
            <div className="card-img-container">
                <img src="../src/assets/harry.jpg"/>
            </div>
            <h3>Book Name</h3>
            <p>Famous book</p>
            <FontAwesomeIcon icon={faHeart}/>
        </div>
    )
}



