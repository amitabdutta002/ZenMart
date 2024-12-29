import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import toast from "react-hot-toast";

function AdminDiscount() {
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    const validAdmin = () =>{
        const Accesstoken = sessionStorage.getItem('AdminAccessToken');
        if (!Accesstoken) {
            navigate('/admin/login')
            toast.error('login to access')
        }
    }
    

    const fetchDiscounts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/admin/discount");
            if (response.data.success) {
                setDiscounts(response.data.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log("Error while fetching discount details");
        }
    };

    const handleToggleActive = async (index) => {
        const updatedDiscounts = [...discounts];
        updatedDiscounts[index].active = !updatedDiscounts[index].active;
        setDiscounts(updatedDiscounts);

        try {
            const updatedDiscount = updatedDiscounts[index];
            const response = await axios.post(`http://localhost:5000/api/v1/admin/updatediscount`, {
                id: updatedDiscount._id,
                active: updatedDiscount.active,
            });

            if (response.data.success) {
                toast.success(`Discount status updated`);
            } else {
                toast.error("Failed to update discount status");
            }
        } catch (error) {
            toast.error("Error updating discount status");
        }
    };

    useEffect(() => {
        validAdmin();
        fetchDiscounts();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-slate-50 h-screen ml-80">
                <div className="bg-slate-50 border-b-2 border-slate-300 rounded-xl w-full h-20 flex justify-between items-center px-10">
                    <div className="text-2xl font-semibold">Manage discounts</div>
                    <Link
                        to={"/admin/creatediscount"}
                        className="w-40 h-2/3 rounded-lg flex justify-center items-center gap-2 text-lg font-semibold shadow-lg text-white bg-indigo-600">
                        <FontAwesomeIcon icon={faPlus} /> Create one
                    </Link>
                </div>
                <div>
                    <div className="w-full h-20 flex justify-start items-center px-10 text-xl font-semibold">
                        Discount lists
                    </div>
                    <div className="w-full h-[75vh] px-10 flex justify-start items-center flex-col gap-2">
                        {discounts.length > 0 ? (
                            discounts.map((discount, index) => (
                                <div
                                    key={discount._id}
                                    className="bg-slate-100 border-b-2 border-slate-300 rounded-lg px-5 w-full flex justify-evenly items-center py-3 gap-5">
                                    <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                        {discount.name}
                                    </div>
                                    <div className="w-2/6 h-full flex justify-start items-center font-medium">
                                        {discount.description}
                                    </div>
                                    <div className="w-20 h-full flex justify-start items-center font-medium">
                                        {discount.percent}%
                                    </div>
                                    <div className="w-1/5 h-full flex justify-start items-center font-medium">
                                        {discount.products} products
                                    </div>
                                    <div className="w-1/6 h-full flex justify-start items-center font-medium">
                                        <button
                                            onClick={() => handleToggleActive(index)}
                                            className={`border px-2 py-1 rounded w-2/3 h-full ${
                                                discount.active ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            }`}>
                                            {discount.active ? "Active" : "Inactive"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center">
                                <pre className="text-lg font-normal">No discounts found!</pre>
                                <pre className="text-lg font-normal">Click on refresh and check again.</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDiscount;