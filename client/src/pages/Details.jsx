import { useState,useContext,useEffect } from "react";
import { useParams } from "react-router-dom"
import useBookFetch from "../customHooks/useBookFetch";
import fiction from "../assets/fiction.jpg";

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
        {selectedBookDetails?(
            <section className="book-details-section">
            <div className="details-main-container">
                <div className="details-img-container">
                    <img src={selectedBookDetails.img?.src || fiction} />
                </div>
                <div className="details-text-container">
                    <div className="details-text-inner-container">
                        <div className="details-main-title-container">
                            <h1>{selectedBookDetails.title}</h1>
                            <h2>By: {selectedBookDetails.author}</h2>
                        </div>
                        <p>{selectedBookDetails.description}</p>
                    </div>
                </div>
            </div>
        </section>):null}
        </>
    );
}