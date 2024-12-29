import React, { useEffect, useState } from "react";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Category from "./Layout/Category";

function AllProducts() {
    const [products, setProducts] = useState([]);
    
    const fetchProducts = async() =>{
        try {
            const response = await axios.get('http://localhost:5000/api/v1/user/')
            if (response.data.success) {
                console.log(response.data.data);
                setProducts(response.data.data)
            }
            else{
                toast.error("No data found")
            }
        } catch (error) {
            console.log("Some error",error);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[])

    return(
        <>
        <Navbar />
        <Category />
        <div className="w-full py-5 px-40" >
            <h1 className="text-2xl font-semibold font-Montserrat" >All products</h1>
        </div>
        <div className="w-full p-5 flex gap-3 flex-wrap justify-center items-center">
            {products.map((product) => (
                <div
                    to={`/user/producthome/${product._id}`}
                    key={product._id}
                    className="w-1/5 h-80 p-5 border border-slate-300 flex justify-center items-center gap-3 rounded-lg shadow-lg flex-col "
                >
                    <img
                        className="w-40 h-40 object-contain"
                        src={product.image}
                        alt={product.name}
                    />
                    <div className="w-full h-1/5 flex justify-start items-start flex-col">
                        <h2 className="text-lg">{product.name}</h2>
                        <p className="text-sm text-slate-600">
                            {product.discountedPrice ? (
                                <>
                                    <span className="line-through">₹ {product.price}</span>
                                    <span className="ml-2 text-green-600">
                                        ₹ {product.discountedPrice}
                                    </span>
                                </>
                            ) : (
                                `₹ ${product.price}`
                            )}
                        </p>
                    </div>
                    <div className="flex justify-evenly items-center w-full h-1/5 gap-3">
                        <Link
                            to={`/user/producthome/${product._id}`}
                            className=" bg-slate-800 border border-slate-800 font-medium text-slate-100 hover:border-none w-1/2 h-full rounded-lg text-md font-Montserrat flex justify-center items-center gap-2 "
                        >
                            View{" "}
                            <FontAwesomeIcon className="text-sm" icon={faChevronRight} />
                        </Link>
                        <Link
                            to={`/user/payementpage/${product._id}`}
                            className=" text-slate-800 border border-slate-800 hover:bg-slate-800 hover:text-slate-100 w-1/2 h-full rounded-lg text-md font-Montserrat font-medium flex justify-center items-center "
                        >
                            Buy Now
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        <Footer />
        </>
    )
    
}
export default AllProducts