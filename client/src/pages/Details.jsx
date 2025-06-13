import { useState,useContext,useEffect } from "react";
import { useParams } from "react-router-dom"
import { BookContext } from "../components/BookContext";
import axios from 'axios';
export default function Details(){
    const {id}=useParams();
    const fullID=`/works/${id}`
    const {bookData}=useContext(BookContext);
    const currentBook=bookData.find(book=>book.id===fullID);
    const [selectedBookDetails,setSelectedBookDetails]=useState(currentBook)


    useEffect(()=>{
        async function getBookData(){
            try{


                const descriptionFetch= await axios.get(`https://openlibrary.org/works/${id}.json`);
                const desc=descriptionFetch.data.description;
                setSelectedBookDetails((prev) => ({
                            ...prev,
                            description: desc?.value ?? desc ?? "No Description Found",
                    })
                );;
            }catch(e){

                console.log(e);
            }
        };
        getBookData();    
    
    },[id])

    return (
        <>
        {selectedBookDetails?(
            <section className="book-details-section">
            <div className="details-main-container">
                <div className="details-img-container">
                <img src={`https://covers.openlibrary.org/b/id/${selectedBookDetails.cover}-M.jpg`} />
                </div>
                <div className="details-text-container">
                    <div className="details-text-inner-container">
                        <div className="details-main-title-container">
                            <h1>{selectedBookDetails.name}</h1>
                            <h2>By: {selectedBookDetails.author[0]}</h2>
                        </div>
                        <p>{selectedBookDetails.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>):null}
        </>
    );
}