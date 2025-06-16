import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import Card from "../components/Cards";
import Header from "../components/Header"
export default function BookListPage(){

    const  q=new URLSearchParams(useLocation().search);
    const query=q.get("bookQuery")
    const [pageNo,setPageNo]=useState(1)
    const [currentList,setCurrentList]=useState([1,2,3,4,5]);



    // useEffect(()=>{
    //     axios.get(`http://localhost:3000/api/search`,{
    //         params:{
    //             q:query,
    //             lim:10
    //         }
    //     }).then((d)=>{
    //         setCurrentList(d.data)
    //     }).catch(e=>console.log(e));
    // },[pageNo]);



    return (
        <>
            <Header
                logo="Go Back"
                search={query}
            />
            <div className="book-list-container">

                <div className="search-filter-container">

                    <form className="search-filter-form">
                        <div className="sort-by">
                            <h1>Sort By:</h1>
                            <input type="radio" name="sort" value="popular"/><label htmlFor="sort">Popular</label>
                            <input type="radio" name="sort" value="popular"/><label htmlFor="sort">Relavent</label>
                            <input type="radio" name="sort" value="popular"/><label htmlFor="sort">Rating</label>
                        </div>
                    </form>
                </div>
                <div className="card-list-container">
                    {currentList?
                        
                        currentList.map((e)=>{
                            return (<Card />)
                        })

                    :<h2>NO</h2>}
                </div>
            </div>
        </>
        
    )
}