import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState } from "react";



export default function Card(props){

    const imageID=props.cover;
    const [fetchedImage,setFetchedImage]=useState(null);
    async function fetchImage(id) {
        const imageObject=new Image();

        return new Promise((res,rej)=>{
            imageObject.onload=()=>res(imageObject);
            imageObject.onerror=(e)=>rej(e);
            imageObject.src=`https://covers.openlibrary.org/b/id/${imageID}-M.jpg`
        })
    }

    useEffect(()=>{
        if(imageID){
            fetchImage(imageID)
                .then((img)=>{
                    setFetchedImage(img);
                }).catch((e)=>{
                    console.log(e)
                })
        }
    },[imageID])



    return(
        <div className="card-container">
            <div className="card-img-container">
                <img src={fetchedImage?.src||"../src/assets/fiction.jpg"}/>
            </div>
            <div className="card-text-container">
                <h3>{props.name}</h3>
                <p>{props.author?.[0]}</p>
                <FontAwesomeIcon icon={faHeart}/>
            </div>
            
        </div>
    )
}



