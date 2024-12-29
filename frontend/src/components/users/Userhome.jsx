import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Category from "./Layout/Category";
import Footer from "./Layout/Footer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import LocomotiveScroll from 'locomotive-scroll';
import {motion} from 'framer-motion';

function Userhome() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    const validUser = () => {
        if (!sessionStorage.getItem("AccessToken")) {
            navigate("/user/register");
            toast.error("Login to access");
        }
    };

    const fetchProducts = async () => {
        try{
            const response = await axios.get("http://localhost:5000/api/v1/user/");
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const fetchDiscounts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/user/discount");
            const fetchedDiscounts = response.data.data;

            const activeDiscounts = fetchedDiscounts.filter(discount => discount.active);            
            setProducts(prevProducts => {
                return prevProducts.map(product => {
                    const applicableDiscount = activeDiscounts.find(discount => 
                        discount.products === "All" || discount.products === product.category
                    );

                    if (applicableDiscount) {
                        const discountedPrice = product.price - (product.price * applicableDiscount.percent / 100);
                        return {
                            ...product,
                            discountedPrice: discountedPrice.toFixed(2) 
                        };
                    }

                    return product;
                });
            });
        } catch (error) {
            console.log("Error Fetching Discounts", error);
        }
    };

    useEffect(() => {
        validUser();
        fetchProducts();
        fetchDiscounts();
    }, []);

    return (
        <>
            <div className="bg-slate-100 w-full h-screen">
                <Navbar />
                <Category />
                <div className="w-full bg-white my-5">
                    <div className="w-full flex justify-between ">
                        <h1 className="w-1/2 py-5 font-Montserrat text-2xl px-40 font-semibold">
                            Our handpicked products
                        </h1>
                        <div className="w-1/6 flex justify-center items-center">
                            <Link to={'/user/category'} className="text-slate-100 bg-slate-800 w-10 h-10 rounded-full flex justify-center items-center gap-2 font-medium text-lg">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>
                    <div className="w-full p-5 flex gap-3 flex-wrap justify-center items-center">
                        {products.slice(0, 8).map((product) => (
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
                                        to={`/user/paymentpage/${product._id}`}
                                        className=" text-slate-800 border border-slate-800 hover:bg-slate-800 hover:text-slate-100 w-1/2 h-full rounded-lg text-md font-Montserrat font-medium flex justify-center items-center "
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex justify-between">
                        <h1 className="w-1/2 py-5 font-Montserrat text-2xl px-40 font-semibold">
                            Electronic picks
                        </h1>
                        <div className="w-1/6 flex justify-center items-center">
                            <Link to={'/user/category/electronics'} className="text-slate-100 bg-slate-800 w-10 h-10 rounded-full flex justify-center items-center gap-2 font-medium text-lg">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>
                    <motion.div initial={{opacity: 0,}} animate={{opacity: 1}} transition={{duration: 1.5, delay:0.5}} className="w-full p-5 flex gap-3 flex-wrap justify-center items-center">
                        {products
                            .filter((product) => product.category === "Electronics")
                            .slice(0, 4)
                            .map((product) => (
                                <div
                                    to={`/user/producthome/${product._id}`}
                                    key={product._id}
                                    className="w-1/5 h-80 p-5 border border-slate-300 flex justify-center items-center gap-3 rounded-lg shadow-lg flex-col ">
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
                                            <FontAwesomeIcon
                                                className="text-sm"
                                                icon={faChevronRight}
                                            />
                                        </Link>
                                        <Link
                                            to={`/user/paymentpage/${product._id}`}
                                            className=" text-slate-800 border border-slate-800 hover:bg-slate-800 hover:text-slate-100 w-1/2 h-full rounded-lg text-md font-Montserrat font-medium flex justify-center items-center "
                                        >
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </motion.div>

                    <div className="w-full flex justify-between">
                        <h1 className="w-1/2 py-5 font-Montserrat text-2xl px-40 font-semibold">
                            Best of furnitures
                        </h1>
                        <div className="w-1/6 flex justify-center items-center">
                            <Link to={'/user/category/furnitures'} className="text-slate-100 bg-slate-800 w-10 h-10 rounded-full flex justify-center items-center gap-2 font-medium text-lg">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>
                    <motion.div initial={{opacity: 0,}} animate={{opacity: 1}} transition={{duration: 1.5, delay:0.5}} className="w-full p-5 flex gap-3 flex-wrap justify-center items-center">
                        {products
                            .filter((product) => product.category === "Furniture")
                            .slice(0, 4)
                            .map((product) => (
                                <div
                                    to={`/user/producthome/${product._id}`}
                                    key={product._id}
                                    className="w-1/5 h-80 p-5 border border-slate-300 flex justify-center items-center gap-3 rounded-lg shadow-lg flex-col ">
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
                                            className=" bg-slate-800 border border-slate-800 font-medium text-slate-100 hover:border-none w-1/2 h-full rounded-lg text-md font-Montserrat flex justify-center items-center gap-2 ">
                                            View{" "}
                                            <FontAwesomeIcon
                                                className="text-sm"
                                                icon={faChevronRight}
                                            />
                                        </Link>
                                        <Link
                                            to={`/user/paymentpage/${product._id}`}
                                            className=" text-slate-800 border border-slate-800 hover:bg-slate-800 hover:text-slate-100 w-1/2 h-full rounded-lg text-md font-Montserrat font-medium flex justify-center items-center ">
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </motion.div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Userhome;