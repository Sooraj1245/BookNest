import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import Card from "../components/Cards";

export default function BookListPage(){

    const  q=new URLSearchParams(useLocation().search);
    const query=q.get("bookQuery")
    const [pageNo,setPageNo]=useState(1)
    const [currentList,setCurrentList]=useState(null);



    useEffect(()=>{
        axios.get(`http://localhost:3000/api/search`,{
            params:{
                q:query,
                lim:10
            }
        }).then((d)=>{
            setCurrentList(d.data)
        }).catch(e=>console.log(e));
    },[pageNo]);



    return (
        <div className="card-list-container">
            {currentList?
                
                currentList.map((e)=>{
                    return (<Card />)
                })

            :<h2>NO</h2>}
        </div>
    )
}