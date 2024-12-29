import axios from "axios";
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/admin/login', {
                username: username,
                password: password
            });
            
            if (response.data.success){
                console.log(response.data.data.admin._id);
                sessionStorage.setItem('AdminAccessToken',response.data.data.AccessToken);
                localStorage.setItem('AdminID',response.data.data.admin._id);
                navigate('/admin/dashboard')
                
            } else {
                toast.error("Login failed");
            }
        } catch (err) {
            console.error("Error logging in:", err);
            const parser = new DOMParser();
            const doc = parser.parseFromString(err.request.response, "text/html");
            const preElement = doc.querySelector("pre");
            let preText = "No error details found";

            if (preElement) {
                preText = preElement.innerHTML.split("<br>")[0];
            }
            
            toast.error(preText);
    
        }
    };

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                {/* <Toaster/> */}
                <div className="w-1/2 h-2/3 rounded-2xl shadow-xl flex">
                    <div className="bg-gradient-to-bl from-purple-600 to-indigo-500 w-1/2 h-full rounded-l-xl">
                        <div className="w-full h-full text-white flex justify-evenly flex-col">
                            <div className="flex flex-col justify-center items-center py-10">
                                <h1 className="text-2xl font-semibold">Enter Credentials</h1>
                                <p className="px-14 text-center mt-2 text-sm">
                                    Verify your username and password before accessing the dashboard.
                                </p>
                            </div>
                            <div className="text-sm flex justify-center items-center py-7">
                                <h1>Don't have an account? <Link to={"/admin/register"} className="text-black font-semibold">Need one</Link></h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex justify-center items-center">
                        <form className="w-full h-full flex justify-center items-center flex-col gap-5" onSubmit={handleSubmit}>
                            <h1 className="text-2xl font-semibold">Admin Login</h1>
                            <input
                                type="text"
                                className="border font-medium border-black w-2/3 h-10 rounded-md px-3 outline-none"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                className="border font-medium border-black w-2/3 h-10 rounded-md px-3 outline-none"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="bg-indigo-500 w-2/3 h-10 rounded-md text-xl font-semibold text-white">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;
