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
        const rawBookResult=await axios.get("https://www.googleapis.com/books/v1/volumes",{
            params:{
                q:query,
                key:"AIzaSyDFabk1-OFMjy8yCFuntfr6HDz2RxQRuqk",
                maxResults:5
            }
        })
        const bookItems= rawBookResult.data.items;
         bookItems.map((obj)=>{
            bookData.push({name:obj.volumeInfo.title,id:obj.id});
        });
        res.send(bookData);

        
    } catch (error) {
        console.log(error);
    }
})



