import {auth,provider} from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";

// font awesom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';




export const  Login=()=>{
    const navigate=useNavigate()
    const signInWithGoogle=async()=>{
    const result=await signInWithPopup(auth,provider);
    if(result){

        navigate("/")
    }
              
    
         

    }

    return(
        <div className="button">
        <p> sign up with google to continue</p>
        <button className="google-button" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} style={{marginRight:"1em",color:""}}/>Sign in with Google
</button>

        </div>
    )
}