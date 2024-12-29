import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Layout/Header.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBox, faCartShopping, faTrash, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminDashboard() {
    const navigate = useNavigate();
    const [admin,setAdmin] = useState('')
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    const validAdmin = () => {
        if (!sessionStorage.getItem('AdminAccessToken')) {
            toast.error('Invalid Admin');
            navigate('/admin/login');  
        }    
    };

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/admin/dashboard');
            const data = res.data.data;
            setUsers(data[0]);
            setProducts(data[2]);
            setOrders(data[1]);
        } catch (err) {
            console.log("Error fetching data", err);
        }
    };

    useEffect(() => {
        validAdmin();
        fetchData();    
    }, []);

    return (
        <>
            <Header />
            <div className="ml-80 w-fill h-screen">
                {/* <SubHeader /> */}
                <div>

                </div>
                <div className="bg-slate-50 w-fill h-2/5">
                    <div className="bg-slate-50 w-full h-1/6 flex justify-between items-center px-10">
                        <div className="text-2xl font-semibold">Overview</div>
                    </div>
                    <div className="bg-slate-50 px-10 py-5 h-4/5 flex justify-evenly items-center gap-5">
                        <div className="py-3 w-1/4 h-full shadow-md bg-teal-500 rounded-xl flex justify-between items-center flex-col px-5">
                            <div className="w-full flex justify-between items-center h-1/3 text-white">
                                <div className="text-xl font-medium font-Montserrat">Users</div>
                                <div className="text-2xl"><FontAwesomeIcon icon={faUserGroup} /></div>
                            </div>
                            <div className="flex-col font-Montserrat font-bold text-white w-full h-full flex justify-center items-start gap-3 text-7xl">
                                {users.length}
                                <p className="font-Montserrat px-0 text-sm font-medium">and still counting..</p>
                            </div>
                        </div>
                        <div className="py-3 w-1/4 h-full shadow-md bg-blue-500 rounded-xl flex justify-between items-center flex-col px-5">
                            <div className="w-full flex justify-between items-center h-1/3 text-white">
                                <div className="text-xl font-medium font-Montserrat">Products</div>
                                <div className="text-2xl"><FontAwesomeIcon icon={faBox} /></div>
                            </div>
                            <div className="flex-col font-Montserrat font-bold text-white w-full h-full flex justify-center items-start gap-3 text-7xl">
                                {products.length}
                                <p className="font-Montserrat px-0 text-sm font-medium">and still counting..</p>
                            </div>
                        </div>
                        <div className="py-3 w-1/4 h-full shadow-md bg-purple-500 rounded-xl flex justify-between items-center flex-col px-5">
                            <div className="w-full flex justify-between items-center h-1/3 text-white">
                                <div className="text-xl font-medium font-Montserrat">Orders</div>
                                <div className="text-2xl"><FontAwesomeIcon icon={faCartShopping} /></div>
                            </div>
                            <div className="flex-col font-Montserrat font-bold text-white w-full h-full flex justify-center items-start gap-3 text-7xl">
                                {orders.length}
                                <p className="font-Montserrat px-0 text-sm font-medium">and still counting..</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-50 w-fill h-3/5">
                    <div className="w-full h-1/6 flex justify-between items-center px-10">
                        <div className="text-2xl font-semibold">Users Info</div>
                        <button onClick={(e)=> navigate('/admin/allusers') } className="bg-indigo-700 text-white w-40 h-2/3 rounded-xl text-lg font-Montserrat">
                            View more <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                    <div className="px-10 py-5">
                        <div className="flex font-bold bg-gray-200 p-2">
                            <div className="w-1/12">#</div>
                            <div className="w-1/4">Full Name</div>
                            <div className="w-1/4">Email</div>
                            <div className="w-1/4">Created At</div>
                            <div className="w-1/4">Id</div>
                        </div>
                        {users.length > 0 ? (
                            users.slice(0,5).map((user, index) => (
                                <div key={user._id} className="flex p-2 border-b odd:bg-white bg-gray-100 border-gray-300">
                                    <div className="w-1/12 h-10 flex justify-start items-center">{index + 1}</div>
                                    <div className="w-1/4 h-10 flex justify-start items-center">{user.fullName}</div>
                                    <div className="w-1/4 h-10 flex justify-start items-center">{user.email}</div>
                                    <div className="w-1/4 h-10 flex justify-start items-center">{new Date(user.createdAt).toLocaleDateString()}</div>
                                    <div className="w-1/4 h-10 flex justify-start items-center">{user._id}</div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center p-2">
                                No users found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;