import React, { useEffect, useState } from "react";
import Navbar from "./Layout/Navbar";
import Category from "./Layout/Category";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Layout/Footer";import { motion } from "framer-motion";


function BooksProduct(){
    const [products, setProducts] = useState([])

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

    return (
        <>
        <Navbar />
        <Category />
        <div className="w-full py-5 px-40 flex justify-start items-center">
            <Link to={'/user/'} className="w-10 h-10 text-slate-500 flex justify-center items-center rounded-full mr-5" > <FontAwesomeIcon icon={ faChevronLeft }/> </Link>
            <p className="text-slate-500 font-medium text-sm">Category /</p>
            <h1 className="text-slate-900 font-medium text-sm"> Books</h1>
        </div>
        <motion.div initial={{y: 35, opacity: 0}} animate={{y: 0, opacity:1}} transition={{duration:0.8}} className="w-full p-5 flex gap-3 flex-wrap justify-center items-center">
            {products.filter((product) => product.category === "Books").map((product) => (
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
        </motion.div>
        <Footer />
        </>
    )
    
}
export default BooksProduct