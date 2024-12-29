import axios from "axios";
import { Link, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faAward, faChevronLeft, faShieldHalved, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Category from "./Layout/Category";
import Navbar from "./Layout/Navbar";
import toast from "react-hot-toast";

function Proudcthome(){
    const { id } = useParams();
    const [products,setProducts] = useState([]);    

    const fetchPoduct = async () =>{
        await axios.get(`http://localhost:5000/api/v1/user/`)
        .then((response)=>{
            setProducts(response.data.data);
        })
        .catch((err)=>{
            console.log("Error while getting products",err);
        })
    }

    const applyDiscount = async () =>{
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
    }

    const handleAdd = async () => {
        const userName = sessionStorage.getItem('UserName');
        // console.log(id);
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/additemtocart', {
                name: userName,
                productId: id
            });
    
            if (response.status == 200) {
                toast.success("Product added");
            } else {
                console.log("Error occurred:", response.data.message || "Unknown Error");
            }
        } catch (error) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(error.request.response, "text/html");
            const preElement = doc.querySelector("pre");
            let preText = "No error details found";

            if (preElement) {
                preText = preElement.innerHTML.split("<br>")[0];
            }

            toast.error(preText);
        }
    };    

    useEffect(()=>{
        fetchPoduct();
        applyDiscount();
    },[])

    return(
        <>
        <Navbar />
        <Category />
        <div className="w-full h-screen bg-slate-100" >
            <div className="w-full h-16 bg-white ">
                {
                    products.filter((product)=> product._id == id).map((product)=>(
                        <>
                        <div className="shadow-sm w-full h-full flex justify-start px-20 gap-10 items-center text-xl" >
                            <Link to={'/user/'} className="text-slate-800 rounded-full text-sm font-Montserrat font-semibold w-10 h-10 flex justify-center items-center gap-2"><FontAwesomeIcon icon={faChevronLeft}/></Link>
                            <div className="h-full flex justify-center items-center ">
                                <p className="text-sm text-slate-500" >{product.category} /</p><p className="text-sm text-slate-800 font-medium" >{product.name}</p>
                            </div>
                        </div>
                        <div className="w-full h-[91.6vh] bg-white flex justify-between ">
                            <div className="w-1/2 h-full flex justify-center items-center">
                                <img className="object-contain shadow-sm rounded-lg w-5/6 h-5/6" src={product.image} alt="" />
                            </div>
                            <div className="bg-slate-100 rounded-l-xl shadow-sm w-1/2 h-full flex justify-start items-center flex-col p-10">
                                <div className="w-full h-16 flex justify-start items-center " >
                                    <h1 className="text-3xl font-semibold" >{product.name}</h1>
                                </div>
                                <div className="w-full text-sm text-slate-500 font-medium pb-5 border-b-2 border-slate-320 ">
                                    <h3 className="text-lg text-slate-700" >{product.description}</h3>
                                    {product.stock > 0 ? 
                                    (
                                        <h3 className={product.stock > 10 ? "text-sm mt-3 text-green-600" : "text-sm mt-3 text-red-500" } >{product.stock} available </h3>
                                    ) : (
                                        <p>Outof stock</p>
                                    )    
                                }
                                </div>
                                <div className="w-full h-24 flex-col flex border-b-2 border-slate-200 justify-center items-start ">
                                <h3 className="tex-sm text-slate-600">
                                            {product.discountedPrice ? (
                                                <>
                                                    <span className="line-through">₹ {product.price}</span>
                                                    <span className="text-xl ml-2 font-semibold text-slate-700">
                                                        ₹ {product.discountedPrice}
                                                    </span>
                                                </>
                                            ) : (
                                                `₹ ${product.price}`
                                            )}
                                        </h3>
                                    <p className="text-sm text-slate-500" >Inclusive of all taxes.</p>
                                </div>
                                <div className="mt-5 w-full h-20 flex gap-5 justify-evenly items-center ">
                                    <button
                                    onClick={() => handleAdd()} 
                                    className="w-1/2 border-[1px] text-slate-800 border-slate-400 h-2/3 rounded-xl font-Montserrat text-xl font-medium flex justify-center items-center" >Add to cart</button>
                                    <Link to={`/user/paymentpage/${product._id}`} className="w-1/2 h-2/3 uppercase font-Montserrat rounded-xl text-xl font-medium text-slate-100 bg-slate-800 flex justify-center items-center" > Buy now </Link>
                                </div>
                                {/* <div className="w-full" >
                                    <h1 className="text-xl font-medium" >Similar products</h1>
                                    <div className="flex justify-evenly items-center" >
                                    {
                                        products.filter((items)=>  product.category == items.category ).slice(0,3).map((item)=>
                                            <>
                                           <Link to={`/user/producthome/${item._id}`} key={item._id} className="mt-5 w-60 h-60 p-5 border bg-white border-slate-300 flex justify-center items-center gap-3 rounded-lg shadow-lg flex-col ">
                                                <img className="w-40 h-40 object-contain" src={item.image} alt={item.name} />
                                                <div className="w-full h-1/5 flex justify-start items-start flex-col " >
                                                    <h2 className="text-lg" >{item.name}</h2>
                                                    <p className="text-sm">₹ {item.price}</p>
                                                </div>
                                            </Link>
                                        </>)
                                    }
                                    </div>
                                </div> */}
                                <div className="w-full flex justify-evenly items-center h-40 mt-5" >
                                    <div className="w-1/5 bg-white h-2/3 gap-3 text-red-500 rounded-md text-lg flex-col shadow-sm flex justify-center items-center " >
                                        <FontAwesomeIcon className="text-2xl"  icon={faTruckFast}/>
                                        <p className="text-xs text-slate-500" >Fast Delivery</p>
                                    </div>
                                    <div className="w-1/5 bg-white h-2/3 gap-3 text-red-500 rounded-md text-lg flex-col shadow-sm flex justify-center items-center " >
                                        <FontAwesomeIcon className="text-2xl"  icon={faAward}/>
                                        <p className="text-xs text-slate-500" >Top Brands</p>
                                    </div>
                                    <div className="w-1/5 bg-white h-2/3 gap-3 text-red-500 rounded-md text-lg flex-col shadow-sm flex justify-center items-center " >
                                        <FontAwesomeIcon className="text-2xl"  icon={faArrowRotateLeft}/>
                                        <p className="text-xs text-slate-500" >7-Day Return</p>
                                    </div>
                                    <div className="w-1/5 bg-white h-2/3 gap-3 text-red-500 rounded-md text-lg flex-col shadow-sm flex justify-center items-center " >
                                        <FontAwesomeIcon className="text-2xl"  icon={faShieldHalved}/>
                                        <p className="text-xs text-slate-500" >Warranty Policy</p>
                                    </div>
                                </div>
                                <div className="w-full text-lg flex justify-center items-center gap-2 h-40" >
                                    <h5 className="text-slate-500" >Having any trouble?</h5>
                                    <Link to={'/user/contact'} className="text-indigo-600" >Contact us</Link>
                                </div>
                            </div>
                        </div>
                        </>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default Proudcthome