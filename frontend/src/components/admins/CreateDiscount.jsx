import React, { useEffect, useState } from "react";
import Header from './Layout/Header.jsx'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function CreateDiscount(){
    const navigate = useNavigate()
    const [bool, setBool] = useState(false);

    const validAdmin = () =>{
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login')
            toast.error('login to access')
        }
    }

    const handleBool = () => {
        setBool((prev) => !prev);
    }

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (formData) => {
        try {
            const discountData = {
                name: formData.name,
                description: formData.description,
                percent: formData.percent,
                products: formData.products,
                active: bool
            };
            
            const response = await axios.post('http://localhost:5000/api/v1/admin/creatediscount',discountData)
            if (response.data.success) {
                // console.log(response);
                toast.success("Discount registered")
                navigate('/admin/discounts')
            } else {
                console.log(response);
            }
            setBool(false);
            reset();

        } catch (error) {
            console.error("Error submitting the form", error);
        }
    }

    useEffect(()=>{
        validAdmin();
    },[])

    return (
        <>
        <Header />
        <div className="ml-80 w-fill h-fit bg-slate-100">
            <div className="w-full flex justify-start items-center px-10 h-20 border-b-2 border-slate-300 rounded">
                <Link to={'/admin/discounts'} className="text-slate-600 h-full w-10 text-lg flex justify-center items-center">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
                <h1 className="text-2xl font-semibold">Create Discount</h1>
            </div>
            <div className="my-10 mx-20 flex justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="px-10 bg-white shadow-md rounded-lg w-2/3 h-screen flex justify-evenly items-center flex-col">
                    <div className="w-full h-1/6 flex justify-center items-start flex-col">
                        <label className="text-xl font-medium text-slate-800" htmlFor="name">Name</label>
                        <input {...register("name", { required: true })} className="text-lg border-slate-400 border w-full h-10 rounded-md outline-none px-5" type="text" />
                    </div>
                    <div className="w-full h-1/6 flex justify-center items-start flex-col">
                        <label className="text-xl font-medium text-slate-800" htmlFor="description">Description</label>
                        <textarea {...register("description", { required: true })} className="flex justify-center items-start border-slate-400 border w-full h-full rounded-md outline-none py-3 px-5" />
                    </div>
                    <div className="w-full h-1/6 flex justify-center items-start flex-col">
                        <label className="text-xl font-medium text-slate-800" htmlFor="percent">Percentage</label>
                        <input {...register("percent", { required: true })} className="text-lg border-slate-400 border w-full h-10 rounded-md outline-none px-5" type="number" max={100} min={0} />
                    </div>
                    <div className="w-full h-1/6 flex justify-center items-start flex-col">
                        <label className="text-xl font-medium text-slate-800" htmlFor="products">Products</label>
                        <select {...register("products", { required: true })} className="text-lg border-slate-400 border w-full h-10 rounded-md outline-none px-5">
                            <option value="All">All</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Appliances">Appliances</option>
                            <option value="Toys">Toys</option>
                            <option value="Books">Books</option>
                        </select>
                    </div>
                    <div className="w-full h-1/6 flex justify-between items-center">
                        <label className="text-xl font-medium text-slate-800" htmlFor="active">Active</label>
                        <button 
                            type="button"
                            onClick={handleBool} 
                            className={`w-1/3 h-10 rounded-lg text-white ${bool ? 'bg-green-600' : 'bg-red-600'}`}
                        >
                            {bool ? "Active" : "Inactive"}
                        </button>
                    </div>
                    <div className="w-full h-1/6 flex justify-center items-center flex-col">
                        <button type="submit" className="w-full h-11 rounded-lg text-2xl font-semibold text-white bg-indigo-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default CreateDiscount;