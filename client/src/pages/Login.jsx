import { useState } from "react"
import axios from "axios";


function LoginSection({logFun}){
    return (
        <form onSubmit={
            (e)=>{
                e.preventDefault();
                logFun(Object.fromEntries(new FormData(e.target)));
            }
        } className="login-form">
            <input type="text" name="userName" placeholder="Enter your Username" />
            <input type="password" name="userPass" placeholder="Enter your Password" />
            <button>Sign In</button>
        </form>
    )
}

function RegisterSection({regFun}){

        return (<form onSubmit={
            (e)=>{
                e.preventDefault();
                regFun(Object.fromEntries(new FormData(e.target)));
            }
        } className="login-form">
            <input type="text" name="userName" placeholder="Enter your Username" />
            <input type="password" name="userPass" placeholder="Enter your Password" />
            <input type="password" name="cnfPass" placeholder="ReEnter your Password" />
            <button>Sign Up</button>
        </form>)
}

export default function Login(){

    const [isRegistered,setIsRegistered] = useState(true);
    const [isError,setIsError]=useState(null);
    const [successMsg,setSuccessMsg]=useState(null)
    function checkError(msg){
        if (msg.error){
            setIsError(msg.error);
        }else{
            setIsError(null);
        }
    }

    async function loginCallback(data){
        try{
            const res=await axios.post("http://localhost:3000/auth/signIn",{datasent:data});
            console.log(res);
            setIsError(null)
        }catch(e){
            setIsError(e.response.data.error)
            console.log(e)
        }
    }


    async function registerCallback(data){
        try{
            const res=await axios.post("http://localhost:3000/auth/signUp",{datasent:data});
            console.log(res);
            setIsRegistered(prev=>!prev);
            setIsError(null)
        }catch(e){
            setIsError(e.response.data.error)
            console.log(e)
        }
    }

    function toggleRegisterLogin(){
        setIsRegistered(prev=>!prev);
    }
    return (
                <div className="login-main-container">
                    <div className="form-p-container">
                        <h1>Book<span>Nest</span></h1>
                            {isRegistered?<LoginSection logFun={loginCallback}/>:<RegisterSection regFun={registerCallback}/>}
                        <p onClick={toggleRegisterLogin}>{isRegistered?"Register here":"Login Here"}</p>
                        {isError?<p>{isError}</p>:null}
                    </div>
                </div>

    
    )
}