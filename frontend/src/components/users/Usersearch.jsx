import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Usersearch() {
    const [search, setSearch] = useState(sessionStorage.getItem('search'));
    const [products, setProducts] = useState([]);

    const handleFetch = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/query', {
                productName: search
            });
            console.log(response);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, [search]);

    return (
        <>
            <Navbar />
            <div className="w-full flex bg-slate-100 justify-start gap-5 px-40 py-5 items-center flex-col ">
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item._id} className="w-full h-60 bg-white shadow-md border border-slate-300 rounded-lg px-10 py-5 flex justify-between items-center">
                            <img className="w-56 h-56" src={item.image} alt={item.name} />
                            <div className="w-2/3 gap-2 h-full flex justify-center items-start px-10 flex-col">
                                <h1 className="text-2xl text-slate-800 font-semibold">{item.name}</h1>
                                <h3 className="text-lg font-medium text-slate-700">₹ {item.price}/-</h3>
                                <h3 className={item.stock < 10 ? "text-red-500 font-semibold" : "text-slate-500"}>
                                    {item.stock < 10 ? `Only ${item.stock} left!` : `${item.stock} available`}
                                </h3>
                            </div>
                            <div className="flex justify-center items-center w-1/6 h-full">
                                <Link to={`/user/producthome/${item._id}`} className="w-14 h-14 rounded-full flex justify-center items-center text-xl bg-slate-800 text-white">
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <>No products found</>
                )}
            </div>
        </>
    );
}

export default Usersearch;
