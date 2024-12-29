import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function CreateProduct() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const validAdmin = () =>{
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login')
            toast.error('login to access')
        }
    }

    const onSubmit = async (formData) => {
        try {
            const newFormData = new FormData();

            newFormData.append("productImage", file);
            newFormData.append("name", formData.name);
            newFormData.append("description", formData.description);
            newFormData.append("category", formData.category);
            newFormData.append("price", formData.price);
            newFormData.append("stock", formData.stock); 

            const response = await axios.post("http://localhost:5000/api/v1/admin/createproducts", newFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                navigate("/admin/products");
                toast.success("Product Registered");
                reset();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Request Failed");
            });
        } catch (error) {
            console.error("Error uploading product:", error);
            toast.error("Product register failed");
        }
    };

    useEffect(()=>{
        validAdmin();
    },[])

    return (
        <>
            <Header />
            <div className="bg-slate-50 ml-80 w-fill h-screen flex justify-between items-center flex-col">
            <div className="w-full text-2xl h-20 flex justify-start items-center px-10 font-semibold">
                    <Link 
                        to={'/admin/products'}
                        className="w-10 h-10 flex justify-center items-center text-sm rounded-full" >
                            <FontAwesomeIcon icon={faChevronLeft}/>
                    </Link>
                    <h1>
                        Create product
                    </h1>
                </div>
                <div className="w-1/2 bg-white h-auto rounded-xl shadow-lg mt-5 px-10 py-5">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full h-full flex justify-evenly items-center gap-5 flex-col">
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label
                                htmlFor="name"
                                className="text-xl font-medium text-slate-700 w-4/5">
                                Name
                            </label>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                id="name"
                                className="border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none"
                                placeholder="Product name"/>
                        </div>
                        <div className="w-full h-40 flex justify-center items-center flex-col">
                            <label
                                htmlFor="description"
                                className="text-xl font-medium text-slate-700 w-4/5">
                                Description
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                id="description"
                                className="border border-slate-400 w-4/5 h-full px-5 py-2 rounded-md outline-none"
                                placeholder="Product description"
                            ></textarea>
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label
                                htmlFor="image"
                                className="text-xl font-medium text-slate-700 w-4/5">
                                Image
                            </label>
                            <input
                                onChange={handleFileUpload}
                                type="file"
                                id="image"
                                className="border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none"/>
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label
                                htmlFor="category"
                                className="text-xl font-medium text-slate-700 w-4/5">
                                Category
                            </label>
                            <select
                                {...register("category", { required: true })}
                                id="category"
                                className="border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none">
                                <option value="">Select Category</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Appliances">Appliances</option>
                                <option value="Books">Books</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label
                                htmlFor="price"
                                className="text-xl font-medium text-slate-700 w-4/5">
                                Price
                            </label>
                            <input
                                {...register("price", { required: true, valueAsNumber: true })}
                                type="number"
                                id="price"
                                className="border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none"
                                placeholder="Product price"
                                min={0}
                            />
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label
                                htmlFor="stock"
                                className="text-xl font-medium text-slate-700 w-4/5">
                                Stock
                            </label>
                            <input
                                {...register("stock", { required: true, valueAsNumber: true })}
                                type="number"
                                id="stock"
                                className="border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none"
                                placeholder="Product stock"
                                min={0}/>
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <button
                                type="submit"
                                className="bg-indigo-600 w-4/5 h-1/2 rounded-md text-white text-lg font-medium hover:bg-indigo-700">
                                Create Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateProduct;