import axios from "axios";

export async function searchBookList(req,res){
    const query=req.query.q;
    const lim=req.query.lim;
    const bookData=[]
    try {
        const rawBookResult=await axios.get("https://openlibrary.org/search.json",{
            params:{
                title:query,
                has_fulltext:"true",
                language:"eng",
                limit:lim,
                fields:"isbn,title,ebook_access,author_name,cover_i"
            },
           
        })
        const bookItems= rawBookResult.data.docs;
        
         bookItems.map((obj)=>{
            bookData.push({
                name:obj.title,
                id:obj.isbn[0]?obj.isbn[0]:obj.isbn,
                author:obj.author_name,
                cover:obj.cover_i
            });
        });

        console.log(bookData)
        res.status(200).send(bookData);

        
    } catch (error) {
        console.log(error);
    }
}

export async function bookSearch(req,res) {
    const id=req.params.id;
    try {
            const bookDetails=await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${id}&jscmd=data&format=json`);
            const firstKey=Object.keys(bookDetails.data)[0];
            const fetchedBookDetails=bookDetails.data[firstKey];

            const {title,authors,cover,publishers,key}=fetchedBookDetails; //This is fetching key=book/OWD....
            const bookKeyFetch=await axios.get(`https://openlibrary.org/${key}.json`) //This is for fetching key= /work/OWND.... 

            const workKey=bookKeyFetch.data.works[0].key;

            const bookDescription=await axios.get(`https://openlibrary.org/${workKey}.json`);

            const description=bookDescription.data.description;
            const completedBook={title,authors,cover,publishers,description};
            // console.log(completedBook);
            res.send(completedBook);
    } catch (error) {
        console.log(error)
    }
}
