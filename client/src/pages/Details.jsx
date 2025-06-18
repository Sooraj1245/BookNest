import { useState,useContext,useEffect } from "react";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom"
import useBookFetch from "../customHooks/useBookFetch";
import fiction from "../assets/fiction.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/Header";
import Search from "../components/Search";

export default function Details(){
    const {id}=useParams();
    const [selectedBookDetails,setSelectedBookDetails]=useState(null)

    async function fetchImg(url){
        const img=new Image();
        return new Promise((res,rej)=>{
            img.onload=()=>res(img);
            img.onerror= e=>rej(e);
            img.src=url;
        });
    }

    useBookFetch(id,(value)=>{
        if(value.cover){
            fetchImg(value.cover.medium)
                .then((img)=>{
                    setSelectedBookDetails({...value,img});
                }).catch(()=>{
                    setSelectedBookDetails(value)
                })
        }else{
            setSelectedBookDetails(value);
        }
    });




    return (
        <>
        <Header />
        <Search />
        {selectedBookDetails?(
            <section className="book-details-section">
            <div className="details-main-container">
                <div className="details-img-container">
                    <img src={selectedBookDetails.img?.src || fiction} />
                </div>
                <div className="content-container-details">
                    <div className="details-main-text-container">
                        <h1>{selectedBookDetails.title}</h1>
                        <h3>By: {selectedBookDetails.author}</h3>
                    </div>
                    <div className="details-secondary-text-container">
                        <h3 style={{textDecoration:"underline", color:"var(--secondary-accent)"}}>Description:</h3>
                        <p>{selectedBookDetails.description}</p>
                        <FontAwesomeIcon style={{fontSize:"30px",cursor:"pointer"}} icon={faHeart}/>
                    </div>
                </div>
            </div>
        </section>):null}
        </>
    );
}