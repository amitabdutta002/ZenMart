import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home(){

    return(
        <>
        <Navbar />
        <div className="w-full rounded-xs bg-[#0a0a0a] h-screen text-zinc-50 flex justify-center items-center flex-col px-40 gap-10" >
            {/* <h1 className="uppercase bg-gradient-to-br from-neutral-50 to-zinc-400 bg-clip-text text-transparent font-Montserrat font-bold text-8xl" >Zenmart</h1> */}
            <h1 className=" bg-gradient-to-br from-neutral-50 to-zinc-400 bg-clip-text text-transparent font-Montserrat font-bold text-6xl" >Your All-in-One Shopping Destination!</h1>
            <p className="-mt-5 text-center text-sm w-2/3 text-zinc-400 tracking-tight" >Welcome to ZenMart, where your shopping dreams come true! From must-have gadgets to cozy home essentials, we offer unbeatable deals that make you smile. Experience the joy of effortless shopping, fast delivery, and personalized care, all in one place! At ZenMart, we turn everyday shopping into something extraordinary.</p>
            {/* <div className="w-full bg-purple-600 ">
                <Link className="">Sign up</Link>
                <Link className="">Sign up</Link>
            </div> */}
            <div className="mt-5 h-12 w-3/4 flex justify-center items-center gap-10 " >
                <Link to={'/user/login'} className="bg-zinc-50 text-zinc-950 text-sm border-[1px] border-[#2f2f2f] hover-glow font-NeueMontreal tracking-wide subpixel-antialiased font-regular w-40 h-full flex justify-center items-center rounded-xl" >Get started</Link>
                {/* <Link className="text-sm border-[1px] border-[#2f2f2f] font-NeueMontreal tracking-wide subpixel-antialiased font-regular w-40 h-full flex justify-center items-center rounded-xl text-zinc-50" >Learn more</Link> */}
            </div>
        </div>
        </>
    )
}

export default Home

// LINKS '/user/login'
// LINKS '/admin/login'