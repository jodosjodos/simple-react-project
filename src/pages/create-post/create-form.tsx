 import { useForm } from "react-hook-form"
 import {yupResolver} from "@hookform/resolvers/yup"
 import * as yup from "yup"
import { useNavigate } from "react-router-dom"
 //firebase things
 import{addDoc,collection} from "firebase/firestore"
 import {auth, db} from "../../config/firebase"
import { async } from "@firebase/util"
import { useAuthState } from "react-firebase-hooks/auth"
 interface createFormData{
    title:string,
    description:string
 }

export const CreateForm=()=>{
    const navigate=useNavigate()
    const [user]=useAuthState(auth);
    const Schema=yup.object().shape({
        title:
        yup
        .string()
        .required("you must add title"),
        description:yup
        .string()
        .required("please provide description")
    })
    const { register,
        handleSubmit,
        formState:{errors}
    }=useForm<createFormData>({
        resolver:yupResolver(Schema)
    })

    // adding data to firebase
     // refterencing
     const postRef=collection(db,"posts")
    const onCreatePost=async(data:createFormData)=>{
    await  addDoc(postRef,{
      title:data.title, // u can do this like ..data
      description:data.description,
      username:user?.displayName,
      userId:user?.uid

    })
        navigate("/")
    }
    return(
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
            <input type="text" placeholder="title..." {...register("title")} />
            <p className="errors">{errors.title?.message}</p>
            <textarea placeholder="description" {...register("description")}/>
            <p className="errors">{errors.description?.message}</p>
            <input type="submit" value="submit" className="submitForm"/>
            </form>
        </div>
    )
}