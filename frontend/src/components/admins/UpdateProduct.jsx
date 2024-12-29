import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({});
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const validAdmin = () => {
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login');
            toast.error('Login to access');
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/admin/products`);
            const product = response.data.data.find((product) => product._id === id);
            if (product) {
                setProductData(product);
                setValue("name", product.name);
                setValue("description", product.description);
                setValue("category", product.category);
                setValue("price", product.price);
                setValue("stock", product.stock);
            }
        } catch (error) {
            toast.error("Failed to fetch product data");
            console.error("Error fetching product data:", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/v1/admin/updateproduct?id=${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response) {
                toast.success("Product updated successfully");
                navigate("/admin/products");
            } else {
                toast.error("Unexpected response from server");
            }
        } catch (error) {
            toast.error("Product update failed");
            console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        validAdmin();
        fetchProductData();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-slate-50 ml-80 w-fill h-auto flex justify-between items-center flex-col">
                <div className="w-full text-2xl h-20 flex justify-start items-center px-10 font-semibold">
                    <Link 
                        to={'/admin/products'}
                        className="w-10 h-10 flex justify-center items-center text-sm rounded-full" >
                            <FontAwesomeIcon icon={faChevronLeft}/>
                    </Link>
                    <h1>
                        Update product
                    </h1>
                </div>
                <div className="w-1/2 bg-white h-auto py-10 flex justify-center items-center flex-col rounded-xl shadow-lg mt-5 px-10 ">
                    {productData.image && (
                        <div className="w-52 h-52 flex items-center justify-center">
                            <img className="w-52 h-52" src={productData.image} alt={productData.name} />
                        </div>
                    )}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full h-full flex justify-evenly items-center gap-5 flex-col">
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label htmlFor="name" className="text-xl font-medium text-slate-700 w-4/5">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                className={`border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none ${errors.name ? 'border-red-500' : ''}`}
                                placeholder="Product name"/>
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="w-full h-40 flex justify-center items-center flex-col">
                            <label htmlFor="description" className="text-xl font-medium text-slate-700 w-4/5">
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register("description", { required: "Description is required" })}
                                className={`border border-slate-400 w-4/5 h-full px-5 py-2 rounded-md outline-none ${errors.description ? 'border-red-500' : ''}`}
                                placeholder="Product description"></textarea>
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label htmlFor="category" className="text-xl font-medium text-slate-700 w-4/5">
                                Category
                            </label>
                            <select
                                id="category"
                                {...register("category", { required: "Category is required" })}
                                className={`border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none ${errors.category ? 'border-red-500' : ''}`}>
                                <option value="">Select Category</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Appliances">Appliances</option>
                                <option value="Books">Books</option>
                            </select>
                            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label htmlFor="price" className="text-xl font-medium text-slate-700 w-4/5">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be greater than or equal to 0" } })}
                                className={`border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none ${errors.price ? 'border-red-500' : ''}`}
                                placeholder="Product price"
                                min={0}/>
                            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <label htmlFor="stock" className="text-xl font-medium text-slate-700 w-4/5">
                                Stock
                            </label>
                            <input
                                type="number"
                                id="stock"
                                {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock must be greater than or equal to 0" } })}
                                className={`border border-slate-400 w-4/5 h-1/2 px-5 rounded-md outline-none ${errors.stock ? 'border-red-500' : ''}`}
                                placeholder="Product stock"
                                min={0}/>
                            {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                        </div>
                        <div className="w-full h-20 flex justify-center items-center flex-col">
                            <button
                                type="submit"
                                className="bg-indigo-600 w-4/5 h-1/2 rounded-md text-white text-lg font-medium hover:bg-indigo-700">
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateProduct;
