import { faArrowRight, faBoxesStacked, faChevronLeft, faCross, faPenToSquare, faPowerOff, faShoppingCart, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function UserAccount() {
    const [details, setDetails] = useState({});
    const [sure, setSure] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [ verify, setVerify ] = useState(false)
    // const [opt, setOtp] = useState(null)
    const navigate = useNavigate();

    const id = sessionStorage.getItem("UserID");

    const fetchUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/account', {
                id: id
            });
            if (response.data.success) {
                console.log(response.data.data);
                setDetails(response.data.data);
            } else {
                console.log("Some error ");
            }
        } catch (error) {
            console.log("Some error in catch block", error);
        }
    };

    const handleSure = () => {
        setSure((prev) => !prev);
        setOldPass('')
        setNewPass('')
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/logout');
            if (response.data.success) {
                sessionStorage.removeItem('AccessToken');
                sessionStorage.removeItem('UserID');
                toast.success("Later!!");
                navigate('/user/login');
            } else {
                console.log('Some error occurred');
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.log('Some error in catch block', error);
        }
    };

    const handleDeleteConfirm = () => {
        setDeleteConfirm((prev) => !prev);
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/deleteaccount', {
                id: id
            });
            if (response.data.success) {
                sessionStorage.removeItem('AccessToken');
                sessionStorage.removeItem('UserID');
                toast.success("Account deleted successfully.");
                navigate('/user/login');
            } else {
                toast.error("Failed to delete account.");
            }
        } catch (error) {
            toast.error("Error occurred while deleting the account.");
            console.log("Some error in catch block", error);
        }
    };

    const handleUpdate = async () =>{
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/updatepassword',{
                id: id,
                oldPass: oldPass,
                newPass: newPass,
            })
            if (response.status == 200) {
                console.log(response);
                toast.success("Password updated")
            } else {
                console.log(response);
            } 
        } catch (error) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(error.request.response, "text/html");
            const preElement = doc.querySelector("pre");
            let preText = "No error details found";

            if (preElement) {
                preText = preElement.innerHTML.split("<br>")[0];
            }

            toast.error(preText);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <div className="w-full h-screen bg-slate-100">
                <div className="w-full shadow-sm h-[10vh] bg-white text-slate-900 gap-5 flex justify-start items-center px-40">
                    <Link to={'/user/'} className="w-10 text-xl h-10 flex justify-center items-center rounded-full">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h1 className="h-full flex justify-center items-center text-xl font-semibold">Account Settings</h1>
                </div>
                <div className="flex justify-center items-center gap-10 px-40 mt-5 w-full h-[87vh]">
                    <div className="bg-white w-1/2 rounded-lg px-5 h-full flex py-5 justify-start gap-5 items-center flex-col ">
                        <img src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" className="size-24 mb-0" />
                        <div className="w-full h-20 text-xl text-center gap-2 px-10 rounded-lg flex justify-start items-center">
                            <p className="text-2xl font-semibold text-slate-600">Hello</p>
                            <h1 className="text-2xl font-semibold bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">{details.fullName}</h1>
                        </div>
                        <Link to={'/user/orders'} className="text-slate-900 border-2 gap-5 border-slate-200 font-medium w-full h-20 text-2xl rounded-lg flex justify-start items-center px-10">
                            <FontAwesomeIcon className="text-[1.5vw]" icon={faBoxesStacked} />Order <FontAwesomeIcon className="text-sm" icon={faArrowRight} />
                        </Link>
                        <Link to={'/user/cart'} className="text-slate-900 border-2 gap-5 border-slate-200 font-medium w-full h-20 text-2xl rounded-lg flex justify-start items-center px-10">
                            <FontAwesomeIcon className="text-[1.5vw]" icon={faShoppingCart} />Cart <FontAwesomeIcon className="text-sm" icon={faArrowRight} />
                        </Link>
                        <button onClick={handleLogout} className="border-2 font-semibold w-full h-20 text-red-600 text-2xl rounded-lg flex justify-start items-center gap-5 px-10">
                            <FontAwesomeIcon icon={faPowerOff} />Logout
                        </button>
                    </div>
                    <div className="w-2/3 h-full bg-white rounded-lg shadow-sm p-10">
                        <div className="w-full h-20 px-16 flex justify-between items-center">
                            <h1 className="text-xl font-semibold">Personal Information</h1>
                        </div>
                        <div className="w-full gap-3 flex justify-center items-start flex-col">
                            <div className="w-full flex justify-start px-20 h-20 items-center gap-10 py-5">
                                <p className="text-lg font-semibold">Name:</p>
                                <input type="text" className="border border-slate-300 w-4/5 text-lg h-full px-5 text-slate-800 rounded-md font-medium outline-none" value={details.fullName} readOnly />
                            </div>
                            <div className="w-full flex justify-start px-20 h-20 items-center gap-10 py-5">
                                <p className="text-lg font-semibold">Email:</p>
                                <input type="text" className="border border-slate-300 w-4/5 text-lg h-full px-5 text-slate-800 rounded-md font-medium outline-none" value={details.email} readOnly />
                            </div>
                            {/* {
                                details.isVerified ? (
                                    <div className="w-full h-20 bg-emerald-100 rounded-xl flex justify-between px-20 items-center ">
                                        <h1 className=" text-emerald-600 font-semibold " >Status: Verified</h1>
                                    </div>                                ) : (
                                    <div className="w-full h-20 bg-yellow-100 rounded-xl flex justify-between px-20 items-center ">
                                        <h1 className=" text-orange-600 font-semibold " >Status: Not Verified</h1>
                                        <button onClick={(e) => setVerify((prev) => !prev) } className="bg-indigo-600 outline-none font-medium w-40 h-1/2 text-slate-100 rounded-lg  uppercase border-none" >Verify</button>
                                    </div>
                                )
                            } */}
                            <div className="w-full flex justify-center items-center gap-10 h-20 px-20">
                                <button onClick={handleSure} className="w-60 bg-slate-800 text-slate-100 h-2/3 rounded-lg text-lg font-medium">Change Password</button>
                                <button onClick={handleDeleteConfirm} className="w-60 border-2 hover:border-red-600 hover:bg-red-600 hover:text-white h-2/3 rounded-lg text-lg font-medium">Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {sure && (
                <div className="w-full h-screen fixed top-0 flex justify-center items-center backdrop-blur-2xl">
                    <div className="w-1/2 bg-slate-100 flex justify-center items-center flex-col gap-5 shadow-md h-2/3 rounded-xl">
                        <input className="w-2/3 h-14 border-[1px] border-slate-300 rounded-lg px-5 text-lg outline-none" value={oldPass} onChange={(e) => setOldPass(e.target.value) } placeholder="Old password" type="text" />
                        <input className="w-2/3 h-14 border-[1px] border-slate-300 rounded-lg px-5 text-lg outline-none" value={newPass} onChange={(e) => setNewPass(e.target.value) } placeholder="New password" type="text" />
                        <div className="w-2/3 h-20 flex justify-evenly items-center">
                            <button className="border-2 border-slate-300 bg-white w-40 h-2/3 rounded-xl text-lg text-slate-800 font-semibold" onClick={handleSure}>Cancel</button>
                            <button onClick={handleUpdate} className="bg-indigo-700 w-40 h-2/3 rounded-xl text-lg text-white font-semibold" >Update</button>
                        </div>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="w-full h-screen fixed top-0 flex justify-center items-center backdrop-blur-2xl">
                    <div className="w-1/2 bg-slate-100 flex justify-center items-center flex-col gap-5 shadow-md h-1/3 rounded-xl">
                        <h1 className="text-xl font-semibold">Are you sure you want to delete your account?</h1>
                        <div className="w-2/3 h-20 flex justify-evenly items-center">
                            <button className="border-2 border-slate-300 bg-white w-40 h-2/3 rounded-xl text-lg text-slate-800 font-semibold" onClick={handleDeleteConfirm}>Cancel</button>
                            <button className="bg-red-600 w-40 h-2/3 rounded-xl text-lg text-white font-semibold" onClick={handleDeleteAccount}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* {
                verify && (
                    <div className="flex justify-center items-center w-full h-screen fixed top-0 bg-slate-900/10 backdrop-blur-2xl">
                        <div className="bg-white w-1/2 h-2/3 border-slate-300 border-[1px] rounded-2xl flex justify-center items-center flex-col gap-4">
                            <div onClick={(e) => setVerify((prev) => !prev )} className="cursor-pointer fixed top-20 right-60 border-2 border-slate-300 bg-white w-10 h-10 flex justify-center items-center rounded-full" >
                                <FontAwesomeIcon className="text-sm" icon={faX} />
                            </div>
                            <h1 className="text-xl font-medium" >Enter the 6 digit OTP</h1>
                            <p className="-mt-5" >Check your email and enter the 6 digit otp</p>
                            <input className="w-1/3 h-10 rounded-lg px-5 border-2 border-slate-500 outline-none" type="text" placeholder=""/>
                            <button className="w-40 bg-indigo-600 h-10 rounded-lg font-semibold text-white" > Submit </button>
                        </div>
                    </div>
                )
            } */}
        </>
    );
}

export default UserAccount;