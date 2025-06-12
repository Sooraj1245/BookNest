import CatagoryCards from "./CatagoryCards";

import loveBook from "../assets/love.jpg"
import mysteryBook from "../assets/mystery.png"
import fictionalBook from "../assets/fiction.jpg"
import love2 from "../assets/love2.jpg"
import love3 from "../assets/love3.jpg"

import fiction2 from "../assets/fiction2.jpg"
import fiction3 from "../assets/fiction3.jpg"

import mystery2 from "../assets/mystery2.jpg"
import mystery3 from "../assets/mystery3.jpg"

import kids1 from "../assets/kids1.jpg"
import kids2 from "../assets/kids2.jpg"
import kids3 from "../assets/kids3.jpg"



export default function Catagories(){
    return(
        <div className="catagory-item-container">
            <CatagoryCards 
            title={"Children's Books"}
            bookImages={[kids1,kids2,kids3]} />
            <CatagoryCards 
            title={"Fantasy/Fictional Books"}
            bookImages={[fictionalBook,fiction2,fiction3]} />
            <CatagoryCards 
            title={"Romance Books"}
            bookImages={[loveBook,love2,love3]} />
            <CatagoryCards 
            title={"Mystery Books"}
            bookImages={[mysteryBook,mystery2,mystery3]} />
        </div>
    )
}