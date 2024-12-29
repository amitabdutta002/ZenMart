import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AllUsers(){
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const validAdmin = () =>{
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login')
            toast.error('login to access')
        }
    }

    const fetchUsers = async () =>{
        try {
            const res = await axios.get('http://localhost:5000/api/v1/admin/dashboard');
            console.log(res.data.data[0]);
            const data = res.data.data;
            setUsers(data[0])
        } catch (err) {
            console.log("Error fetching data", err);
        }
    }

    useEffect(()=>{
        validAdmin()
        fetchUsers();
    },[])
    return(
        <>
        <Header />
        <div className="ml-80 bg-slate-200 w-fill min-h-screen" >
                <div className="flex bg-gray-300 font-semibold p-4">
                    <div className="w-1/12">#</div>
                    <div className="w-1/4">Full Name</div>
                    <div className="w-1/4">Email</div>
                    <div className="w-1/4">Created At</div>
                    <div className="w-1/4">ID</div>
                </div>
                <div className="flex flex-col">
                    {users.length > 0 ? (
                        users.map((user,index) => (
                            <div key={user._id} className="flex items-center p-4 bg-white odd:bg-gray-100">
                                <div className="w-1/12">{index + 1}</div>
                                <div className="w-1/4">{user.fullName}</div>
                                <div className="w-1/4">{user.email}</div>
                                <div className="w-1/4">{new Date(user.createdAt).toLocaleDateString()}</div>
                                <div className="w-1/4">{user._id}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg mt-5">No users found.</p>
                    )}
                </div>
        </div>
        </>
    )
}
export default AllUsers