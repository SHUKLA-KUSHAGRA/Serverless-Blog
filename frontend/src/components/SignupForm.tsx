import { SignupInput } from "@kushagra_shukla/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const SignupForm = () => {
    const [userdata , setuserdata] = useState<SignupInput>({name:"",email:"",password:""});
    const navigate = useNavigate();
    const SignupClick = async () => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,userdata);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate('/blogs');
        } catch(e) {
            alert("Some Error Occured");
        }
    }
    return (
        <>
        <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create An Account
                </div>
                <div className="text-slate-700">
                    Already have an account? <Link className="underline" to={"/login"}>Login</Link>
                </div>
                </div>
                <div className="py-10">
                <LabelledInput label="Name" type="text" id="name" placeholder="Name..." onChange={(e) => {
                    setuserdata({
                        ...userdata,
                        name : e.target.value
                    })
                }}/>
                <LabelledInput label="Email" type="email" id="email" placeholder="email@mail.com" onChange={(e) => {
                    setuserdata({
                        ...userdata,
                        email : e.target.value
                    })
                }}/>
                <LabelledInput label="Password" type="password" id="password" placeholder="******" onChange={(e) => {
                    setuserdata({
                        ...userdata,
                        password : e.target.value
                    })
                }}/>
                <button onClick={SignupClick} type="button" className="text-black mt-5 bg-gradient-to-r from-green-400 via-green-500
                to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full p-5">Signup</button>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

interface LabelledInputType {
    label : string;
    type : string;
    id : string;
    placeholder : string;
    onChange: (e : ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({label,type,id,placeholder,onChange} : LabelledInputType) => {
    return (
        <div>
            <label className="block my-2 text-sm font-semibold text-gray-900">{label}</label>
            <input onChange={onChange} type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}