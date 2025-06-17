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
    const [currentPageItems,setCurrentPageItems]=useState(null);
    const [sortWay,setSortWay]=useState("new");
    const [endResult,setEndResult]=useState(false);
    const [currentIndex,setCurrentIndex]=useState(1);
    
    function handleChange(e){
        setSortWay(e.target.value)
        setPageNo(prev=>prev+1);
        setCurrentIndex(pageNo*10)
    }

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
                lim:50,
                sort:sortWay || "new"
            }
        }).then((d)=>{
            setCurrentList(d.data);
            setCurrentPageItems(d.data.splice(0,10));
            console.log(d.data.length)
        }).catch(e=>console.log(e));
    },[]);



    useEffect(()=>{
        if(pageNo==5){
            setEndResult(true);
            return;
        }else{
            setEndResult(false);
        }
        if(pageNo>1){
            const newList=currentList.splice(currentIndex,pageNo*10);
            setCurrentPageItems(newList);
        }
    },[pageNo])

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


                            <div className="input-field-radio">
                                <input onChange={handleChange} className="hidden-radio" type="radio" name="sort" value="old" checked={sortWay === "old"}/>
                                <label className="custom-radio" htmlFor="sort">Old</label>
                            </div>


                            <div className="input-field-radio">
                                <input checked={sortWay==="new"} onChange={handleChange} type="radio" name="sort" value="new"/>
                                <label htmlFor="sort">New</label>
                            </div>


                            <div className="input-field-radio">
                                <input checked={sortWay==="rating"} onChange={handleChange} type="radio" name="sort" value="rating"/>
                                <label htmlFor="sort">Rating</label>
                            </div>


                            <button>Done</button>
                            
                        </div>
                    </form>
                </div>
                <div className="card-list-container">
                    {currentList?
                        
                        currentPageItems.map((e)=>{
                            return (<Card key={e.id} cover={e.cover}
                                name={e.name}
                                author={e.author}
                                 />)
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