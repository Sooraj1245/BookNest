import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import Card from "../components/Cards";
import Header from "../components/Header"
import Search from "../components/Search";



export default function BookListPage(){

    const  q=new URLSearchParams(useLocation().search);
    const query=q.get("bookQuery");
    const [currentList,setCurrentList]=useState(null);
    const [currentPageItems,setCurrentPageItems]=useState(null);
    const [language,setLanguage]=useState("eng");
    
    function handleChange(e){
        setLanguage(e.target.value)
        // setPageNo(prev=>prev+1);
        // setCurrentIndex(pageNo*10)
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
        setCurrentList(null)
        axios.get(`http://localhost:3000/api/search`,{
            params:{
                q:query,
                lim:50,
                lang:language || "eng"
            }
        }).then((d)=>{
            setCurrentList(d.data);
        }).catch(e=>console.log(e));
    },[language]);

    return (
        <>
            <Header
            />
            <Search />
            <div className="book-list-container">
                <div className="search-filter-container">

                    <div className="search-filter-form">
                        <div className="sort-by">
                            <h1>Edition Language</h1>


                            <div className="input-field-radio">
                                <input onChange={handleChange} className="hidden-radio" type="radio" name="sort" value="eng" checked={language === "eng"}/>
                                <label className="custom-radio" htmlFor="sort">English</label>
                            </div>


                            <div className="input-field-radio">
                                <input checked={language==="fr"} onChange={handleChange} type="radio" name="sort" value="fr"/>
                                <label htmlFor="sort">French</label>
                            </div>


                            <div className="input-field-radio">
                                <input checked={language==="ger"} onChange={handleChange} type="radio" name="sort" value="ger"/>
                                <label htmlFor="sort">German</label>
                            </div>
                            <div className="input-field-radio">
                                <input checked={language==="chi"} onChange={handleChange} type="radio" name="sort" value="chi"/>
                                <label htmlFor="sort">Chinese</label>
                            </div>
                            <div className="input-field-radio">
                                <input checked={language==="jpn"} onChange={handleChange} type="radio" name="sort" value="jpm"/>
                                <label htmlFor="sort">Japanese</label>
                            </div>
                            <div className="input-field-radio">
                                <input checked={language==="hin"} onChange={handleChange} type="radio" name="sort" value="hin"/>
                                <label htmlFor="sort">Hindi</label>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="card-list-container">
                    {currentList?
                        
                        currentList.map((e)=>{
                            return (<Card cardID={e.id} key={e.id} cover={e.cover}
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