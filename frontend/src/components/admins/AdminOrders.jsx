// import React, { useEffect, useState } from "react";
// import Header from "./Layout/Header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRotateRight, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import toast from "react-hot-toast";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";

// function AdminOrders() {
//     const [products, setProducts] = useState([])
//     const [orders, setOrders] = useState([]);
//     const [modifiedOrders, setModifiedOrders] = useState({}); 
//     const [isModified, setIsModified] = useState(false); 
//     const navigate = useNavigate();

//     const validAdmin = () =>{
//         const Accesstoken = sessionStorage.getItem('AdminAccessToken');
//         if (!Accesstoken) {
//             navigate('/admin/login')
//             toast.error('login to access')
//         }
//     }

//     const fetchProducts = async () =>{
//         try {
//             const response = await axios.get('http://localhost:5000/api/v1/admin/products')
//             if (response) {
//                 console.log(response.data.data);
//                 setProducts(response.data.data)
//             }else{
//                 console.log("Error fetching user");
//             }
//         } catch (error) {
//             console.log("Some error in try catch block",error)
//         }
//     }

//     const handleRefresh = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/v1/admin/orders');
//             setOrders(response.data.data);
//             // toast.success('Orders Refreshed');
//         } catch (error) {
//             console.log("Error while fetching orders", error);
//             toast.error("Error fetching orders");
//         }
//     };

//     const handleStatusChange = (orderId, newStatus) => {
//         setModifiedOrders(prev => ({
//             ...prev,
//             [orderId]: newStatus 
//         }));
//         setIsModified(true);
//     };

//     const handleSaveChanges = async () => {
//         try {
//             await Promise.all(
//                 Object.entries(modifiedOrders).map(([orderId, newStatus]) =>
//                     axios.post(`http://localhost:5000/api/v1/admin/updateorder`, {
//                         id: orderId,
//                         orderStatus: newStatus
//                     })
//                 )
//             );
//             toast.success("Order statuses updated");
//             setModifiedOrders({}); 
//             setIsModified(false); 
//             handleRefresh();
//         } catch (error) {
//             toast.error("Error updating order statuses");
//         }
//     };

//     useEffect(() => {
//         validAdmin();
//         fetchProducts();
//         handleRefresh();
//     }, []);

//     const activeOrders = orders.filter(order => !["Delivered", "Cancelled"].includes(order.orderStatus));
//     const completedOrders = orders.filter(order => ["Delivered", "Cancelled"].includes(order.orderStatus));

//     return (
//         <>
//             <Header />
//             <div className="bg-slate-50 ml-80 w-fill h-screen">
//                 <div className="bg-slate-50 border-b-2 border-slate-300 rounded-xl w-full h-20 flex justify-between items-center px-10">
//                     <div className="text-2xl font-semibold">Manage Orders</div>
//                     {isModified && (
//                         <button
//                             onClick={handleSaveChanges}
//                             className="w-40 h-2/3 rounded-lg flex justify-center items-center gap-2 text-lg font-semibold shadow-lg text-white bg-indigo-600">
//                                 <FontAwesomeIcon icon={faFloppyDisk}/>
//                                 Save
//                         </button>
//                     )}
//                 </div>
//                 <div className=" px-10 py-5 w-full">
//                     <div className="flex justify-start items-center gap-5">
//                         <h1 className="text-2xl font-semibold">Order details</h1>
//                         <button className="text-indigo-700 bg-slate-200 w-10 h-10 rounded-full shadow" onClick={handleRefresh}>
//                             <FontAwesomeIcon icon={faArrowRotateRight} />
//                         </button>
//                     </div>
//                     <div className="w-full h-[75vh] mt-5 flex justify-start items-center flex-col gap-2">
//                         {activeOrders.length > 0 ? (
//                             activeOrders.map((order) => (
//                                 <div key={order._id} className="bg-slate-100 border-b-2 border-slate-300 rounded-lg px-5 w-full flex justify-evenly items-center py-3 gap-5">
//                                     <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                         {order.user}
//                                     </div>
//                                     <div className="w-1/4 h-full flex justify-start items-center font-medium">
//                                         {order.product}
//                                     </div>
//                                     <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                         ₹ {order.totalAmount}
//                                     </div>
//                                     <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                         <select
//                                             defaultValue={order.orderStatus}
//                                             onChange={(e) => {
//                                                 const newStatus = e.target.value;
//                                                 handleStatusChange(order._id, newStatus);
//                                             }}
//                                             className="border rounded px-2 py-1">
//                                             <option value="Pending">Pending</option>
//                                             <option value="Processing">Processing</option>
//                                             <option value="Shipped">Shipped</option>
//                                             <option value="Delivered">Delivered</option>
//                                             <option value="Cancelled">Cancelled</option>
//                                         </select>
//                                     </div>
//                                     <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                         {moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="h-full flex flex-col justify-center items-center">
//                                 <pre className="text-lg font-normal">No active orders found!</pre>
//                             </div>
//                         )}
//                         {completedOrders.length > 0 && (
//                             <div className="mt-5 w-full">
//                                 <h2 className="text-xl font-semibold">Completed Orders</h2>
//                                 {completedOrders.map((order) => (
//                                     <div key={order._id} className="bg-slate-100 border-b-2 border-slate-300 rounded-lg mt-3 px-5 w-full flex justify-evenly items-center py-3 gap-5">
//                                         <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                             {order.user}
//                                         </div>
//                                         <div className="w-1/4 h-full flex justify-start items-center font-medium">
//                                             {order.product}
//                                         </div>
//                                         <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                             ₹ {order.totalAmount}
//                                         </div>
//                                         <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                             {order.orderStatus}
//                                         </div>
//                                         <div className="w-1/6 h-full flex justify-start items-center font-medium">
//                                             {moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default AdminOrders;
import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [modifiedOrders, setModifiedOrders] = useState({});
    const [isModified, setIsModified] = useState(false);
    const navigate = useNavigate();

    const validAdmin = () => {
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login');
            toast.error('login to access');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/admin/products');
            if (response) {
                console.log(response.data.data);
                setProducts(response.data.data);
            } else {
                console.log("Error fetching user");
            }
        } catch (error) {
            console.log("Some error in try catch block", error);
        }
    };

    const handleRefresh = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/admin/orders');
            setOrders(response.data.data);
            // toast.success('Orders Refreshed');
        } catch (error) {
            console.log("Error while fetching orders", error);
            toast.error("Error fetching orders");
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        setModifiedOrders(prev => ({
            ...prev,
            [orderId]: newStatus
        }));
        setIsModified(true);
    };

    const handleSaveChanges = async () => {
        try {
            await Promise.all(
                Object.entries(modifiedOrders).map(([orderId, newStatus]) =>
                    axios.post(`http://localhost:5000/api/v1/admin/updateorder`, {
                        id: orderId,
                        orderStatus: newStatus
                    })
                )
            );
            toast.success("Order statuses updated");
            setModifiedOrders({});
            setIsModified(false);
            handleRefresh();
        } catch (error) {
            toast.error("Error updating order statuses");
        }
    };

    useEffect(() => {
        validAdmin();
        fetchProducts();
        handleRefresh();
    }, []);

    const getProductImage = (productId) => {
        const productImage = products.find((p) => p._id === productId )
        return productImage ? productImage.image : ''
    };

    const activeOrders = orders.filter(order => !["Delivered", "Cancelled"].includes(order.orderStatus));
    const completedOrders = orders.filter(order => ["Delivered", "Cancelled"].includes(order.orderStatus));

    return (
        <>
            <Header />
            <div className="bg-slate-50 ml-80 w-fill h-screen">
                <div className="bg-slate-50 border-b-2 border-slate-300 rounded-xl w-full h-20 flex justify-between items-center px-10">
                    <div className="text-2xl font-semibold">Manage Orders</div>
                    {isModified && (
                        <button
                            onClick={handleSaveChanges}
                            className="w-40 h-2/3 rounded-lg flex justify-center items-center gap-2 text-lg font-semibold shadow-lg text-white bg-indigo-600">
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            Save
                        </button>
                    )}
                </div>
                <div className="px-10 py-5 w-full">
                    <div className="flex justify-start items-center gap-5">
                        <h1 className="text-2xl font-semibold">Order details</h1>
                        <button className="text-indigo-700 bg-slate-200 w-10 h-10 rounded-full shadow" onClick={handleRefresh}>
                            <FontAwesomeIcon icon={faArrowRotateRight} />
                        </button>
                    </div>
                    <div className="w-full h-[75vh] mt-5 flex justify-start items-center flex-col gap-2">
                        {activeOrders.length > 0 ? (
                            activeOrders.map((order) => (
                                <div key={order._id} className="bg-slate-100 border-b-2 border-slate-300 rounded-lg px-5 w-full flex justify-evenly items-center py-3 gap-5">
                                    <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                        {order.user}
                                    </div>
                                    <div className="w-1/4 h-full flex justify-start items-center font-medium">
                                        <img src={getProductImage(order.product)} alt="Product" className="w-32 h-32 object-contain" />
                                    </div>
                                    <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                        ₹ {order.totalAmount}
                                    </div>
                                    <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                        <select
                                            defaultValue={order.orderStatus}
                                            onChange={(e) => {
                                                const newStatus = e.target.value;
                                                handleStatusChange(order._id, newStatus);
                                            }}
                                            className="border rounded px-2 py-1">
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                        {moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center">
                                <pre className="text-lg font-normal">No active orders found!</pre>
                            </div>
                        )}
                        {completedOrders.length > 0 && (
                            <div className="mt-5 w-full">
                                <h2 className="text-xl font-semibold">Completed Orders</h2>
                                {completedOrders.map((order) => (
                                    <div key={order._id} className="bg-slate-100 border-b-2 border-slate-300 rounded-lg mt-3 px-5 w-full flex justify-evenly items-center py-3 gap-5">
                                        <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                            {order.user}
                                        </div>
                                        <div className="w-1/4 h-full flex justify-start items-center font-medium">
                                            <img src={getProductImage(order.product)} alt="Product" className="w-32 h-32 object-contain" />
                                        </div>
                                        <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                            ₹ {order.totalAmount}
                                        </div>
                                        <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                            {order.orderStatus}
                                        </div>
                                        <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                            {moment(order.createdAt).format('DD-MM-YYYY, h:mm a')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminOrders;