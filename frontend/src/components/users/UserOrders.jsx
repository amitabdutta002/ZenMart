import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocomotiveScroll from 'locomotive-scroll';

function UserOrder(){
    const locomotiveScroll = new LocomotiveScroll({
        lenisOptions:{
            lerp: 0.5,
            duration: 1.4,
            smoothWheel: true,
        }
    });
    const [userName, setUserName] = useState('')
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([])    


    const fetchOrders = async () =>{
        const name = sessionStorage.getItem('UserName')
        if (!name) {
            console.log("Name not found");
            return
        }
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/getuserorder',{
                name: name
            })
            if (response.data.success) {
                setOrders(response.data.data)
            }
            else{
                console.log("Error in fetching orders");
            }
        } catch (error) {
            console.log("Some error in catch block");
            
        }
    }

    const fetchProduct = async () =>{
        try {
            const response = await axios.get('http://localhost:5000/api/v1/user/')
            if (response.data.success) {
                console.log(response.data.data);
                setProducts(response.data.data)
            }else{
                console.log("Some error");
            }
        } catch (error) {
            console.log("Some error in catch block",error);
        }
    }

    const findImage = (productId) => {
        const requiredProduct = products.find((product) => product._id === productId);
    
        if (requiredProduct && requiredProduct.image && requiredProduct.name ) {
            return  <div className="w-full flex justify-evenly items-center" >
                        <img src={requiredProduct.image} alt={requiredProduct.name} className="w-32 h-32 object-contain "/>
                        <h1 className="font-medium" >{requiredProduct.name}</h1>
                    </div>
        } else {
            return <div className="w-20 h-20 bg-gray-300 flex items-center justify-center">No Image</div>;
        }
    };
    

    useEffect(() =>{
        const name = sessionStorage.getItem('UserName')
        setUserName(name)
    },[name])

    useEffect(()=>{
        fetchOrders()
        fetchProduct()
    },[])

    return(
        <>
        <div className="w-full h-auto bg-slate-50">
            <div className="w-full h-[10vh] bg-white text-slate-900 gap-5 border-b-[1px] border-slate-300 flex justify-start items-center px-40 ">
                <Link to={'/user/account'} className="w-10 text-xl h-10 flex justify-center items-center rounded-full" ><FontAwesomeIcon icon={faChevronLeft}/> </Link>
                <h1 className="h-full flex justify-center items-center text-xl font-semibold">{userName}'s orders</h1>
            </div>
            <div className="w-full h-[90vh] bg-slate-50 flex justify-start px-40 items-center gap-5 flex-col ">
                {
                    orders.map((order)=>
                        <div className="w-full h-auto flex justify-between items-center bg-white mt-3 rounded-lg border-[1px] border-slate-300" key={order._id}>
                            <div className="w-2/5 h-40 flex justify-center items-center" >
                                {findImage(order.product)}
                            </div>
                            <div className="w-1/5 text-center " >₹ {order.totalAmount}</div>
                            <div className="w-1/5 text-center " >{order.orderStatus}</div>
                            <div className="w-1/5 text-center " >{new Date(order.createdAt).toLocaleDateString(
                                "en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}</div>
                        </div>
                    )
                }
            </div>
        </div>
        </>
    )
}
export default UserOrder