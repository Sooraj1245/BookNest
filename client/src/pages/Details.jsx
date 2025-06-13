import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import axios from 'axios';
export default function Details(){
    const {id}=useParams();

    const [selectedBook,setSelectedBook]=useState([]);

    useEffect(()=>{
        async function getBookData(){
            try{
                const fetchedData= await axios.get(`https://openlibrary.org/works/${id}.json`);
                console.log(fetchedData.data)
            }catch(e){
                console.log(e);
            }
        };
        getBookData();

        
    
    },[])

    return (<h1>Hl</h1>
        // <>
        // {selectedBook?(<section className="book-details-section">
        //     <div className="details-main-container">
        //         <div className="details-img-container">
        //         <img src={book.image} alt={book.title} />
        //         </div>
        //         <div className="details-text-container">
        //             <div className="details-text-inner-container">
        //                 <div className="details-main-title-container">
        //                     <h1>{book.name}</h1>
        //                     <h2>By: {book.author}</h2>
        //                     <h3>Published By: {book.publisher}</h3>
        //                 </div>
        //                 <p>{book.description}
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </section>):null}
        // </>
    );
}