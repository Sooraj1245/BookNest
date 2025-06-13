import { Children, use, useState } from "react";
import { createContext } from "react";

export const BookContext=createContext();

export const BookProvider=({children})=>{
    const [bookData,setBookData]=useState([]);

    return (
        <BookContext.Provider value={{bookData,setBookData}}>
            {children}
        </BookContext.Provider>
    )
};