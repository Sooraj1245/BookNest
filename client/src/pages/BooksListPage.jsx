import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import Card from "../components/Cards";
import Header from "../components/Header"
import Search from "../components/Search";
export default function BookListPage(){

    const  q=new URLSearchParams(useLocation().search);
    const query=q.get("bookQuery")
    const [pageNo,setPageNo]=useState(1)
    const [currentList,setCurrentList]=useState(null);
    const [sortWay,SetSortWay]=useState(null);
    function SkeletonLoad(){
    return (
        <div className="skeleton-card-container">
            <div className="skeleton-img-container">

            </div>
            <div className="skeleton-text-container">

            </div>
        </div>
    )
}

    useEffect(()=>{
        axios.get(`http://localhost:3000/api/search`,{
            params:{
                q:query,
                lim:10,
                sort:sortWay || "popular"
            }
        }).then((d)=>{
            setCurrentList(d.data)
        }).catch(e=>console.log(e));
    },[pageNo]);



    return (
        <>
            <Header
                logo="Go Back"
                search={query}
            />
            <Search />
            <div className="book-list-container">
                <div className="search-filter-container">

                    <form className="search-filter-form">
                        <div className="sort-by">
                            <h1>Sort By</h1>
                            <div className="input-field-radio"><input className="hidden-radio" type="radio" name="sort" value="Popular"/><label className="custom-radio" htmlFor="sort">Popular</label></div>
                            <div className="input-field-radio"><input type="radio" name="sort" value="Popular"/><label htmlFor="sort">Rating</label></div>
                            <div className="input-field-radio"><input type="radio" name="sort" value="Popular"/><label htmlFor="sort">Relavence</label></div>
                            <button>Done</button>
                            
                        </div>
                    </form>
                </div>
                <div className="card-list-container">
                    {currentList?
                        
                        currentList.map((e)=>{
                            return (<Card key={e.id} />)
                        })

                    :<>
                        <SkeletonLoad />
                        <SkeletonLoad />
                        <SkeletonLoad />    
                    </>}
                </div>
            </div>
        </>
        
    )
}