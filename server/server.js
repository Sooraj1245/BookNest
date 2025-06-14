import e from "express";
import bodyParser from "body-parser";
import cors from "cors";
import auth from "./routes/auth.js";
import axios from 'axios';

const app=e();
app.use(bodyParser.json())

app.use(cors({
    origin:[
        "http://localhost:5173"
    ]
}))

const PORT=3000;

app.use("/auth",auth)


app.post("/register",(req,res)=>{
    const data=req.body;
    console.log(data);
})

app.listen(PORT,()=>{
    console.log("Listening in Port 3000")
})



app.get("/search",async(req,res)=>{
    const query=req.query.q;
    const bookData=[]
    try {
        const rawBookResult=await axios.get("https://openlibrary.org/search.json",{
            params:{
                title:query,
                has_fulltext:"true",
                language:"eng",
                limit:6,
                fields:"isbn,title,ebook_access,author_name,key"
            },
           
        })
        const bookItems= rawBookResult.data.docs;
        
         bookItems.map((obj)=>{
            bookData.push({
                name:obj.title,
                id:obj.isbn[0]?obj.isbn[0]:obj.isbn,
                author:obj.author_name,
                key:obj.key
            });
        });
        console.log(bookData)
        res.send(bookData);

        
    } catch (error) {
        console.log(error);
    }
})



