import { useEffect } from "react";
import { useState,useRef,useCallback } from "react"
import axios from 'axios';
import {AnimatePresence, motion} from 'motion/react'
import useClickOutside from "../customHooks/useClickOutside";
import { useNavigate } from "react-router-dom";




export default function Search(){

    const navPage=useNavigate();

    const [searchItem,setSearchItem]=useState("");
    const [isFocused,setIsFocused]=useState(false);
    const [books,setBooks]=useState([]);
    const [selectedBook,setSelectedBook]=useState({})

    const formRef=useRef();


    useClickOutside(formRef,()=>setIsFocused(false));


    function useDebounce(callback,delay){
        const timer=useRef();

        const debouncedFunction=useCallback((...args)=>{
            clearTimeout(timer.current);
            timer.current=setTimeout(()=>{
                callback(...args);
            },delay);
        },[callback,delay]);

        return {debouncedFunction,timer};
    }

    const {debouncedFunction:debouncedFiltering,timer}=useDebounce(async (value)=>{

        //Server call to recieve book list
        try {
            const res=await axios.get("http://localhost:3000/search",{
                params:{
                    q:value
                }
            });
            console.log(res)
            setBooks(res.data);
        } catch (error) {
            console.log(error)
        }
    },500);



    function handleChange(item){
        const trimmedItem=item.trim();
        if(trimmedItem==""){ //Prevent API call when input is a whitespace
            setSearchItem(trimmedItem)
        }else{
            setSearchItem(item);//Preserve user inputted spaces (iron+man)
        }
        
    };
   
    function handleFocus(){
        setIsFocused(true);
    };


    const handleLiClick=(id)=>()=>{

        navPage(`book/${id}`)
    }
    useEffect(()=>{
        if(searchItem!==""){
                debouncedFiltering(searchItem);
        }else{
            clearTimeout(timer.current);
            setBooks([]);
            return
        }
    },[searchItem]);
        
       
    
    
    


    return(
            <form ref={formRef} className="search-form">
                
                <input onFocus={handleFocus} onChange={(e)=>handleChange(e.target.value)} value={searchItem} placeholder="Whatchu wanna read today?" className="search-input"></input>

                

                <button>Go</button>
                <AnimatePresence>
                    {books.length>0 && isFocused?(<motion.ul

                        key="results"
                        initial={{ opacity: 0, scaleY: 0,backgroundColor: "rgba(255,255,255,0)" }}
                        animate={{ opacity: 1, scaleY: 1,backgroundColor: "rgba(65, 88, 179, 0.06)"  }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ originY: 0 }}
                    >
                        {books.map((e,i)=>(
                            <motion.li
                            
                            onClick={handleLiClick(e.id)}
                            key={e.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: i* 0.08 }}
                            whileHover={{scale:1.05,color:"var(--primary-accent)"}}
                            >
                                {e.name}
                            </motion.li>
                        ))}
                    </motion.ul>):null}
                </AnimatePresence>
            </form>
            
    )
}