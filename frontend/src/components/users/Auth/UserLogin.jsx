import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function UserLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/login', { 
                email: email,
                password: password
            });

            if (response.data.success) {
                // console.log(response.data.data[0]._id);
                sessionStorage.setItem('AccessToken', response.data.data[1]);
                sessionStorage.setItem('UserID',response.data.data[0]._id);
                sessionStorage.setItem('UserName',response.data.data[0].fullName);
                toast.success(`Welcome ${response.data.data[0].fullName}`);
                navigate('/user/');
            }

        } catch (error) {
            console.error("Error logging in:", error);

            const parser = new DOMParser();
            const doc = parser.parseFromString(error.request.response, "text/html");
            const preElement = doc.querySelector("pre");
            let preText = "No error details found";

            if (preElement) {
                preText = preElement.innerHTML.split("<br>")[0];
            }

            toast.error(preText);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
            <div className="w-1/3 h-2/3 p-6 bg-white rounded-xl shadow-lg flex justify-center items-center flex-col gap-7">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit} className="w-4/5">
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="font-medium text-xl w-full px-3 py-2 border rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="font-medium text-xl w-full px-3 py-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full text-lg bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-4 gap-3">
                        <h3>Don't have an account?</h3>
                        <Link to="/user/register" className="text-indigo-500 ">
                            Create Account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserLogin;
