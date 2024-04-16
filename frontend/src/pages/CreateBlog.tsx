import axios from "axios"
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateBlog = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();

    const handlePublish = async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content,
        },{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
        navigate(`/blog/${response.data.id}`);
    }
    return (
        <>
        <AppBar/>
        <div className="flex justify-center m-10">
        <div className="max-w-screen-lg w-full">
            <input onChange={(e) => {
                setTitle(e.target.value);
            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>
            <TextEditor onChange={(e)=>{
                setContent(e.target.value);
            }}/>
            <button onClick={handlePublish}type="button" className="text-black bg-gradient-to-r from-blue-400 via-blue-500
                    to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm text-center w-1/3 me-2 p-2">Publish</button>
        </div>
        </div>
        </>
    )
}

const TextEditor = ({onChange} : {onChange : (e: ChangeEvent<HTMLTextAreaElement>)=>void}) => {
    return (
    <div className="mt-2">
        <div className="my-2 max-w-screen-lg w-full">
            <textarea onChange={onChange} id="editor" rows={8} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Write an article..." required />
        </div>
    </div>  
    ) 
}