import axios from "axios";
import { useEffect } from "react";

export default function useBookFetch(id,callback){
    useEffect(()=>{
        const completedBook={}
        try {
            async function fetchBookDetails(){
                const bookDetails=await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${id}&jscmd=data&format=json`);
                const firstKey=Object.keys(bookDetails.data)[0];
                const fetchedBookDetails=bookDetails.data[firstKey];
                const {title,authors,cover,publisher,key}=fetchedBookDetails; //This is fetching key=book/OWD....
                const bookKeyFetch=await axios.get(`https://openlibrary.org/${key}.json`) //This is for fetching key= /work/OWND.... 
                
                const workKey=bookKeyFetch.works[0].key;

                const bookDescription=await axios.get(`https://openlibrary.org/${workKey}.json`); //This field uses the work key...
                const {description}=bookDescription.description;
                const completedBook={title,authors,cover,publisher,description};

                
                if(fetchedBookDetails && bookDescription.data){
                    callback(completedBook);
                }
            }
            fetchBookDetails();
        } catch (error) {
            
        }   
    },[id])
}