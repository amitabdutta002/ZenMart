import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Paymentpage() {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/admin/products/`);
            setProducts(response.data.data);
        }catch (err) {
            console.log("Error while getting products", err);
        }};
        
    const handleRedirect = async () =>{
        const name = sessionStorage.getItem('UserName');

        const product = products.find((product)=> product._id == id)
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/createorder/',{
                user: name,
                product: id,
                totalAmount: product.price,
            });
            if (response.data.success) {
                toast.success('Order Placed')
                navigate('/user/'); 
            } else {
                console.error('Order creation failed:', response.data.message);
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    }
    
    useEffect(()=>{
        fetchProduct();
    },[]);

    return (
        <>
            <div className="bg-slate-100 w-full min-h-screen">
                <div className="w-full h-20 bg-white shadow-sm flex justify-center items-center">
                    <h1 className="font-Montserrat text-3xl font-bold text-gray-800">Secure Payment</h1>
                </div>
            
            {products
            .filter((product) => product._id == id)
            .map((product) => (
                <div key={product._id} className="w-full mt-10 flex justify-center items-start gap-10 px-10">
                    <div className="w-1/2 h-[80vh] rounded-lg overflow-hidden shadow-lg bg-white p-5">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-md"/>
                    </div>
                    <div className="w-1/2 h-full bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">{product.name}</h2>
                            <p className="text-slate-500 mb-4">{product.description}</p>
                            <p className="text-2xl font-bold text-slate-800 mb-6">Price: ₹{product.price}</p>
                        {/* <div className="w-full gap-5 flex justify-center items-center flex-col p-5" >
                        <h2 className="text-sm text-slate-500 " >Scan the QR and make payment</h2>
                        <img className="w-60 h-60" src="/images/QR.png" alt="QR code" />
                        </div>
                        {price !== product.price && setPrice(product.price)} */}
                        <button onClick={handleRedirect} className="w-full mt-6 bg-slate-800 text-white py-3 rounded-lg font-Montserrat text-lg font-semibold transition duration-300 ease-in-out">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            ))}
            </div>
        </>
    );

}

export default Paymentpage;