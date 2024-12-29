import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import axios from "axios";

function CreateAdmin(){
    const navigate = useNavigate();
    const [name ,setName] = useState(null)    
    const [username ,setUsername] = useState(null)
    const [password ,setPassword] = useState(null)

    const validAdmin = () =>{
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login')
            toast.error('login to access')
        }
    }

    const handleName = (e) =>{
        e.preventDefault()
        setName(e.target.value)
    }

    const handleUsername = (e) =>{
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePass = (e) =>{
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleSubmit = async () =>{
        try {
            const response = await axios.post('http://localhost:5000/api/v1/admin/register',{
                fullName: name,
                username: username,
                password: password
            })
            if (response.data.success) {
                navigate('/admin/dashboard')
                toast.success("Admin Created")
            } else {
                toast.error(response.data.message || "Failed to register")
            }
        } catch (error) {
            console.log("Some Error", error);
            toast.error('An error occurred while creating user');
        }
    }

    useEffect(()=>{
        validAdmin()
    },[])

    return(
        <>
        <Header />
        <div className="ml-80 w-fill h-screen bg-slate-100" >
            <div className="w-full h-20 rounded-b-xl border-b-2 border-slate-300">
                <div className="w-1/4 flex justify-center items-center gap-2 h-full">
                    <Link to={'/admin/account'} className="w-10 h-10 flex justify-center items-center rounded-full"  >
                        <FontAwesomeIcon className="text-xl" icon={faChevronLeft}/>
                    </Link>
                    <h1 className="text-2xl font-semibold" >Create admin</h1>
                </div>
                <div className="w-full h-[90vh] flex justify-center items-center ">
                    <div className="w-1/2 h-2/3 bg-white shadow-md rounded-xl flex justify-evenly items-center py-20 flex-col gap-5 ">
                        <h1 className="text-2xl font-semibold" >Admin registration</h1>
                        <input className="w-2/3 h-12 border-2 border-slate-300 rounded-lg text-lg font-medium px-5 outline-none" value={name} onChange={handleName}  placeholder="Name" type="text" />
                        <input className="w-2/3 h-12 border-2 border-slate-300 rounded-lg text-lg font-medium px-5 outline-none" value={username} onChange={handleUsername}  placeholder="Username" type="text" />
                        <input className="w-2/3 h-12 border-2 border-slate-300 rounded-lg text-lg font-medium px-5 outline-none" value={password} onChange={handlePass}  placeholder="Password" type="text" />
                        <button onClick={handleSubmit} className="w-2/3 h-14 bg-indigo-600 rounded-lg text-xl font-medium text-white  " >Submit</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
    
}
export default CreateAdmin