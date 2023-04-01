import { Link } from "react-router-dom";
import {auth} from "../config/firebase"
import { useAuthState} from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";
export const Navbar=()=>{
    const [user,loading,error]=useAuthState(auth)
    if(user){
        console.log(auth.currentUser?.photoURL);
        
    }
    if(error){
        console.log(error);
        
    }
    if(loading){
        return <p>loading.....</p>
    }
    const signUserOut=async()=>{
await signOut(auth)

    }
    const display=()=>{
        if(user){
            return (
                <div className="user">
                
            
                <p className="userName">{user?.displayName}</p>
                { user?.photoURL &&
                <img src={user?.photoURL ||""} className="userImage"  width="80px" height="80px" alt="not loading"/>  
  
                }             
               <button onClick={signUserOut} className="logOut">logout</button>
               
              </div>
            )
        }
    }
    return(
        <div className="navbar">
            <div className="links">

            <Link to='/' className="links">Home</Link>

           {!user ?(<Link to='/login' className="links">Login</Link>):(

            <Link to='/createpost' className="links">create Post</Link>
           )}
            </div>
            {display()}
         

        </div>
        
    )
}