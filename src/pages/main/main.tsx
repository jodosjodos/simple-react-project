import {getDocs,collection} from "firebase/firestore"
import { useEffect, useState } from "react"
import {db} from "../../config/firebase"
import {Post} from "./post"
//define how post look like

export interface Post{
    id:string,
    title:string,
    username:string,
    description:string
}
export const  Main=()=>{
    const [postsList,setPostList]=useState<Post[] | null>(null)
    const postRef=collection(db,"posts")
    const gePosts=async()=>{
        const data=await getDocs(postRef);
        setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id}))as Post[]);
        
    }
    useEffect(()=>{
        gePosts();
        
    },[])
    return(
        <div>
            <h1>home page</h1>
            {
            postsList?.map((post)=>{
              return  <Post post={post}/>
            })
            }
         </div>
    )
}