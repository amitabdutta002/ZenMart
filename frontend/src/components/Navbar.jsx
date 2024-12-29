import React, { useState, useEffect } from "react";
import { easeOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Navbar(){
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
          const isScrollingUp = prevScrollPos > currentScrollPos;
    
          setIsVisible(isScrollingUp);
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, [prevScrollPos]);


    return(
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }} transition={{ ease: easeOut, duration: 0.5 }} className="bg-zinc-950/10 z-50 backdrop-blur-sm flex justify-evenly items-center w-full h-16 px-60 fixed top-0 left-0">
            <div className="w-1/2 h-full text-zinc-100 flex justify-start items-center font-Montserrat font-bold text-4xl ">
                <span className="text-red-600" >Zen</span>
                <span>Mart</span>
            </div>
            <div className="w-1/2 h-full flex justify-end items-center gap-12 font-NeueMontreal font-normal">
                <Link className="hover:underline antialiased hover:text-zinc-300 text-[#6a6a6a]" >Our work</Link>
                <Link className="hover:underline antialiased hover:text-zinc-300 text-[#6a6a6a]" >About us</Link>
                <Link to={'/admin/login'} className="hover:underline antialiased hover:text-zinc-300 text-[#6a6a6a]" >Admin</Link>
                <Link to={'/user/login'} className="hover:bg-zinc-50 hover:text-zinc-950 ml-10 w-28 h-2/3  antialiased text-zinc-50 justify-center items-center flex gap-1 rounded-xl hover-glow " >
                    <h2>Sign up</h2>
                </Link>
            </div>
        </motion.div>
    )

}
export default Navbar