import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserCart() {
    const [userName, setUserName] = useState('');
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchCart = async (name) => {
        const response = await axios.post('http://localhost:5000/api/v1/user/getusercart', {
            name: name
        });
        if (response.status === 200) {
            console.log(response.data.data);
            setCart(response.data.data);
        } else {
            console.log(response);
        }
    };

    const productDetails = (productId) => {
        const product = products.find((product) => product._id === productId);
    
        if (product) {
            return (
                <div className="flex gap-4 bg-white p-4 rounded-lg shadow-md justify-evenly items-center">
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-contain rounded-lg" />
                    <div className="w-1/2 flex flex-col justify-center">
                        <h2 className="font-semibold text-lg">{product.name}</h2>
                        <p className="text-gray-600">Price: ₹{product.price}</p>
                        <p className="text-gray-600">Description: {product.description}</p>
                    </div>
                    <div className="w-1/3 flex justify-center items-end" >
                        <Link to={`/user/producthome/${product._id}`} className="bg-slate-800 text-slate-100 w-10 h-10 rounded-full flex justify-center items-center">
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Link>
                    </div>
                </div>
            );
        } else {
            return <p className="text-red-500">Product not found</p>;
        }
    };    

    const fetchProduct = async () => {
        const response = await axios.get('http://localhost:5000/api/v1/user/');
        if (response.status === 200) {
            console.log(response.data.data);
            setProducts(response.data.data);
        } else {
            console.log(response);
        }
    };

    useEffect(() => {
        const name = sessionStorage.getItem('UserName');
        setUserName(name);
        fetchCart(name);
        fetchProduct();
    }, []);

    return (
        <>
            <div className="w-full h-screen bg-slate-100">
                <div className="w-full shadow-sm h-[10vh] bg-white text-slate-900 gap-5 flex justify-start items-center px-40">
                    <Link to={'/user/'} className="w-10 text-xl h-10 flex justify-center items-center rounded-full">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <h1 className="h-full flex justify-center items-center text-xl font-semibold">
                        {userName}'s cart
                    </h1>
                </div>
                <div className="w-full h-[90vh] px-40 overflow-y-auto bg-slate-100">
                    {cart.map((item) => (
                        <div key={item._id} className="my-3">
                            {productDetails(item.product)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserCart;