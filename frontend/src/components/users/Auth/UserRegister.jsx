import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function UserRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/user/register',
        {
          fullName: name,
          email: email,
          password: password
        }
      )

      if (res.data.success) {
        console.log("Register successful", res.data);
        toast.success("Registration Successfull");
        navigate('/user/login');
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
      <div className="w-1/3 h-2/3 p-6 bg-white rounded-xl shadow-lg flex justify-center items-center flex-col gap-10">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="w-4/5">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="font-medium text-xl w-full px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              className="font-medium text-xl w-full px-3 py-2 border rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full text-lg bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-neutral-400 text-lg font-medium w-full flex justify-center items-center gap-3">
          <h3 className="">Already have an account?</h3>
          <Link to="/user/login" className="text-indigo-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;