import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Layout/Header";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function AdminAccount() {
    const [admin, setAdmin] = useState(null);
    const [sure, setSure] = useState(false);
    const [box, setBox] = useState(false);
    const [oldPass, setOldPass] = useState(null)
    const [newPass, setNewPass] = useState(null)
    const navigate = useNavigate()

    const handleAdd = () =>{
        navigate('/admin/createadmin')
    }

    const validAdmin = () =>{
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login')
            toast.error('login to access')
        }
    }

    const fetchData = async () => {
        try {
            const Id = localStorage.getItem('AdminID');

            if (!Id) {
                console.log("AdminID is not set or invalid.");
                return;
            }
            const response = await axios.post(`http://localhost:5000/api/v1/admin/getadmin`, {
                id: Id
            });
            setAdmin(response.data.data);            
        } catch (error) {
            console.log("No response found", error);
        }
    };

    const deleteAdmin = async () =>{
        const id = localStorage.getItem('AdminID')
        const response = await axios.post('http://localhost:5000/api/v1/admin/deleteadmin',{
            id: id
        }).then(()=>{
            if (response.data.success) {
                sessionStorage.removeItem('AdminAccessToken')
                localStorage.removeItem('AdminID')
                toast.success('We will miss you')
                navigate('/admin/register')
            }
        })
        .catch(()=>{
            console.log("Some Error");
        })
    }

    const updatePassword = async () =>{
        try {
            const id = localStorage.getItem('AdminID')
            const response = await axios.put('http://localhost:5000/api/v1/admin/updatepassword',{
                id: id,
                oldPass: oldPass,
                newPass: newPass
            })
            if (response.data.success) {
                console.log(response);
                toast.success('Password updated')
                setBox(false)
                setNewPass('')
                setOldPass('')
            }else{
                toast.error(response.data.message || "Password update failed")
            }  
        }
        catch(error){
            console.log("Some Error", error);
            toast.error('An error occurred while updating password');
        }
    }

    const handleBox = () =>{
        setBox((prev)=> !prev)
    }

    const handleSure = () =>{
        setSure((prev)=> !prev)
    }

    useEffect(() => {
        validAdmin();
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-slate-100 ml-80 w-fill h-screen ">
                <div className="w-full h-20 px-10 flex border-b-2 rounded-xl border-slate-300 justify-between items-center ">
                    <div className="w-1/6 h-full flex gap-5 justify-start items-center ">
                        <Link to={'/admin/dashboard'} className=" w-10 h-10 flex justify-center items-center rounded-full text-sm" >
                            <FontAwesomeIcon className="text-xl"  icon={faChevronLeft}/>
                        </Link>
                        <h1 className="text-2xl font-semibold" >Accounts</h1>
                    </div>
                    <div className="w-1/6 h-full flex justify-center items-center gap-2 flex-col" >
                        <button onClick={handleAdd} className="bg-indigo-600 flex gap-3 justify-center items-center w-4/5 h-2/3 rounded-lg text-lg font-semibold text-white" >
                            <FontAwesomeIcon icon={faPlus}/>
                            <p>Add admin</p>
                        </button>
                    </div>
                </div>
                {admin ? (
                    <div className="w-full h-[89vh] flex justify-center items-center gap-10 px-20 py-10" >
                        <div className="bg-white w-1/2 h-full rounded-lg ">
                            <div className="w-full py-5 h-1/2 px-10 " >
                                <h1 className="pt-5 text-2xl font-Montserrat font-semibold ">Loggedin as: {admin.username}</h1>
                                <h1 className="py-2 text-sm font-Montserrat font-medium ">Admin ID: {admin._id}</h1>
                                <h1 className="py-2 text-lg font-Montserrat font-medium ">Name: {admin.fullName}</h1>
                                <h1 className="text-md font-Montserrat font-semibold ">Created at: {new Date(admin.createdAt).toLocaleDateString()}</h1>
                                <div className="w-full h-1/2 flex justify-evenly items-start flex-col" >
                                    <button onClick={handleBox} className="w-full font-medium rounded-md h-1/3 bg-white border-[1px] border-slate-300  text-indigo-600 flex justify-center items-center gap-3 text-lg " ><FontAwesomeIcon icon={faPen}/> Change password</button>
                                    <button onClick={handleSure} className="w-full font-medium rounded-md h-1/3 bg-white border-[1px] text-red-600 border-slate-300 flex justify-center items-center gap-3 text-lg " ><FontAwesomeIcon icon={faTrash}/>Delete account</button>
                                </div>
                            </div>
                        </div>
                        {/* <h1> AdminId: {admin._id}</h1>
                        <h1> Name: {admin.fullName}</h1>
                        <h1> Username: {admin.username}</h1>
                        <h1> Cretaed At: {admin.createdAt}</h1> */}
                    </div>
                ) : (
                    <p className="text-gray-500">Loading admin details...</p>
                )}
            </div>
            {
                sure && 
                <div className="w-full h-screen flex justify-center items-center fixed backdrop-blur-md top-0">
                    <div className="w-1/2 h-2/3 flex flex-col justify-evenly items-center rounded-2xl gap-20 shadow-lg bg-white" >
                        <h1 className="text-2xl w-full h-1/2 flex justify-center items-end font-semibold " >Do you want to delete account?</h1>
                        <div className="w-full h-1/2 flex justify-center items-start gap-10 ">
                            <button onClick={handleSure} className="w-40 h-14 text-slate-950 rounded-lg text-xl uppercase font-semibold border-2 border-slate-300 " >cancel</button>
                            <button onClick={deleteAdmin} className="w-40 h-14 bg-red-600 rounded-lg text-xl uppercase font-semibold text-white" >delete</button>
                        </div>
                    </div>
                </div>
            }
            {
                box &&
                <div className="w-full h-screen flex justify-center items-center fixed backdrop-blur-md top-0">
                    <div className="w-1/2 h-2/3 flex flex-col justify-evenly items-center rounded-2xl gap-10 shadow-lg bg-white" >
                        <div className="w-full h-1/2 flex justify-end items-center flex-col gap-5">
                            <input className="w-1/2 h-1/5 rounded-lg font-semibold outline-none border-2 border-slate-300 px-5 text-lg text-slate-700" onChange={(e)=> setOldPass(e.target.value) } value={oldPass} placeholder="Old Password" type="text" />
                            <input className="w-1/2 h-1/5 rounded-lg font-semibold outline-none border-2 border-slate-300 px-5 text-lg text-slate-700" onChange={(e)=> setNewPass(e.target.value) } value={newPass} placeholder="New Password" type="text" />
                        </div>
                        <div className="w-full h-1/2 flex justify-center items-start gap-10 ">
                            <button onClick={handleBox} className="w-40 h-14 text-slate-950 rounded-lg text-xl uppercase font-semibold border-2 border-slate-300 " >cancel</button>
                            <button onClick={updatePassword} className="w-40 h-14 bg-indigo-600 rounded-lg text-xl uppercase font-semibold text-white" >update</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default AdminAccount;