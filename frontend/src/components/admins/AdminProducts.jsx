import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

function AdminProduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    const validAdmin = () =>{
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login')
            toast.error('login to access')
        }
    }

    const handleRefresh = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/admin/products');
            setProducts(response.data.data);    
            // toast.success("Products Refreshed")
        } catch (error) {
            console.log("Unable to refresh");
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/v1/admin/deleteproduct?id=${id}`);
            toast.success("Product deleted");
            handleRefresh();
        } catch (error) {
            console.log("Unable to delete product");
        }
    }

    const handleEdit = (id) =>{
        navigate(`/admin/updateproduct/${id}`)
    }

    useEffect(() => {
        validAdmin();
        handleRefresh();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-slate-50 ml-80 w-fill h-screen ">
                <div className="bg-slate-50 rounded-xl border-b-2 border-slate-300 w-full h-20 flex justify-between items-center px-10">
                    <div className="text-2xl font-semibold">Manage products</div>
                    <Link to={'/admin/createproducts'} className="w-40 h-2/3 rounded-lg flex justify-center items-center gap-2 text-lg font-semibold shadow-lg text-white bg-indigo-600">
                        <FontAwesomeIcon icon={faPlus} /> Create new
                    </Link>
                </div>
                <div className="px-10 py-5 w-full">
                    <div className="flex justify-start items-center gap-5">
                        <h1 className="text-2xl font-semibold">Product details</h1>
                        <button className="text-indigo-700 bg-slate-200 w-10 h-10 rounded-full shadow" onClick={handleRefresh}>
                            <FontAwesomeIcon icon={faArrowRotateRight} />
                        </button>
                    </div>
                    <div className="w-full h-[75vh] mt-5 flex justify-start items-center flex-col gap-2">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product._id} className="bg-slate-100 border-b-2 border-slate-300 rounded-lg px-5 w-full flex justify-evenly items-center py-3 gap-5">
                                    {/* <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                        <a href={product.image} target="_blank" rel="noopener noreferrer">Image</a>
                                    </div> */}
                                    <img src={product.image} className="w-40 h-40 object-contain rounded-lg" alt="" />
                                    <div className="w-1/2 h-full ml-7 flex justify-start items-center font-medium">{product.name}</div>
                                    <div className="w-3/4 h-full flex justify-start items-center font-medium">{product.description}</div>
                                    {/* <div className="w-1/4 h-full flex justify-start items-center font-medium">{product.category}</div> */}
                                    <div className="w-1/6 h-full flex justify-start items-center font-medium">₹ {product.price}</div>
                                    <div className="w-2/6 h-full flex justify-evenly items-center text-slate-900 gap-5">
                                        <button className="w-1/2 text-xl h-full rounded hover:text-indigo-600" onClick={() => handleEdit(product._id)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className="w-1/2 text-xl h-full rounded hover:text-red-600" onClick={() => handleDelete(product._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center">
                                <pre className="text-lg font-normal">No products found!</pre>
                                <pre className="text-lg font-normal">Click on refresh and check again.</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminProduct;
