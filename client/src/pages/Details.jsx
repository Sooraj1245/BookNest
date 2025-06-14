import { useState,useContext,useEffect } from "react";
import { useParams } from "react-router-dom"
import { BookContext } from "../components/BookContext";
import axios from 'axios';
import useBookFetch from "../customHooks/useBookFetch";
export default function Details(){
    const {id}=useParams();
    const [selectedBookDetails,setSelectedBookDetails]=useState(null)
    useBookFetch(id,(value)=>setSelectedBookDetails(value));




    // useEffect(()=>{
    //     if(!bookData) return;


    //     async function fetchImage(){
    //         const imgInstance=new Image();
    //         return new Promise((res,rej)=>{
    //             imgInstance.onload=()=>res(imgInstance);
    //             imgInstance.onerror=rej;
    //             imgInstance.src=`https://covers.openlibrary.org/b/id/${currentBook.cover}-M.jpg`
    //         });
    //     }

    //     async function getBookData(){
            
    //         try{
    //             const descriptionFetch= await axios.get(`https://openlibrary.org/works/${id}.json`);
    //             const desc=descriptionFetch.data.description;
    //             const image=await fetchImage();
    //             setSelectedBookDetails({
    //                         ...currentBook,
    //                         description: desc?.value ?? desc ?? "No Description Found",
    //                         image:image
    //                 }
    //             );
    //         }catch(e){

    //             console.log(e);
    //         }
    //     };
    //     getBookData();    
    
    // },[id])

    return (<h1>{console.log(selectedBookDetails)}</h1>
        // <>
        // {selectedBookDetails?(
        //     <section className="book-details-section">
        //     <div className="details-main-container">
        //         <div className="details-img-container">
        //             <img src={selectedBookDetails.image.src} />
        //         </div>
        //         <div className="details-text-container">
        //             <div className="details-text-inner-container">
        //                 <div className="details-main-title-container">
        //                     <h1>{selectedBookDetails.name}</h1>
        //                     <h2>By: {selectedBookDetails.author[0]}</h2>
        //                 </div>
        //                 <p>{selectedBookDetails.description}
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </section>):null}
        // </>
    );
}