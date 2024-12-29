import React from "react";
import { Link } from "react-router-dom";

function AdminRegisterText(){

    return(
        <>
        <div className="w-full h-screen flex justify-center items-center" >
            <div className="w-1/2 h-2/3 rounded-2xl shadow-xl flex ">
                <div className="bg-gradient-to-bl from-purple-600 to-indigo-500 w-full h-full rounded-xl ">
                    <div className="w-full h-full text-white flex justify-evenly flex-col" >
                        <div className=" flex flex-col justify-center items-center py-10 ">
                            <h1 className="text-2xl font-semibold">Looks like someone wants the Admin access</h1>
                            <p className="mt-2 text-md" >Ask an Admin to create an account and provide you the credentials.</p>
                        </div>
                        <div className="text-sm flex justify-center items-center py-7" >
                            <h1>Got the credentials? <Link to={"/admin/login"} className="text-black font-semibold" > Go Login</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminRegisterText ;