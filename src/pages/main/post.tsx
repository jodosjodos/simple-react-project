import { addDoc, collection ,query, where,getDocs, deleteDoc} from "firebase/firestore";
import { Post as IPost } from "./main"
import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { doc } from "firebase/firestore";
// import { collection } from "firebase/firestore";
interface Props{
 post:IPost
}

interface Like{
    likeId:string,
    userId:string
}

export const Post=(props:Props)=>{
    const {post}=props;
    const [user]=useAuthState(auth)
    const likesRef=collection(db,"likes");
    const [likes,setLikes]=useState<Like[] |null>(null)
    
    const likesDoc=query(likesRef,where("postId","==",post.id))

    const addLike=async()=>{
        try{

           const newDoc= await addDoc(likesRef,{
            userId:user?.uid,
            postId:post.id,
            });
            if(user){
    
                setLikes((prev)=>prev?[...prev,{userId:user?.uid,likeId:newDoc.id}]:[{userId:user?.uid,likeId:newDoc.id}])
            }
        }catch(err){
            console.log(err);
            
        }
    }


    //relike
    const removeLike=async()=>{
        try{

            const likeToDeleteQuery=query(likesRef,
            where("postId","==",post.id)
            ,where("userId","==",user?.uid));
            const likeToDeleteData=await getDocs(likeToDeleteQuery)
            const likeId=likeToDeleteData.docs[0].id;
            const likeToDelete=doc(db,"likes",likeId);
            await deleteDoc(likeToDelete);
            if(user){
    
               setLikes(
                (prev)=>{
                    return prev && prev.filter((like)=>{
                        like.likeId !==likeId
                    })
                }
               )
            }
       
        }catch(err){
        console.log(err);
        
        }
    }

    //get likes
   const getLikes=async()=>{
     const data=await getDocs(likesDoc);
      setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
      
     
    }
    
    // check if he has liked it
    const hasUserLiked=likes?.find((like)=>like.userId===user?.uid)

    useEffect(()=>{
        getLikes( )
    },[])
   
    return (
     <div>
        <div className="titleDiv">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={hasUserLiked?removeLike:addLike}>
                {hasUserLiked? <>👎</>:<>👍</>}
            </button>
            {likes &&<p>likes:{likes.length}</p>}
        </div>
      </div>
    )
}