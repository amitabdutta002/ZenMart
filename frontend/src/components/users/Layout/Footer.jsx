import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
function Footer(){
    return(
        <>
        <div className="w-full h-96">
            <div className="w-full h-1/2 px-40 bg-white flex justify-between items-center text-5xl ">
                <div className="font-Montserrat font-medium flex justify-center items-center  ">Contact us</div>
                <Link className="text-sm hover:shadow-lg hover:bg-slate-300 w-20 h-20 bg-slate-200 shadow-md text-slate-800 rounded-full flex justify-center items-center" > <FontAwesomeIcon icon={faArrowRight} /> </Link>
            </div>
            <div className="w-full h-1/2  bg-neutral-950 text-slate-100 flex" >
                <div className="w-1/2 flex justify-center items-center font-semibold text-5xl h-full " >
                    {/* <Link to={/user/} className="font-japan text-slate-100 hover:text-red-600">ゼンマート</Link > */}
                    <Link to={/user/} className="font-Montserrat text-slate-100 hover:text-red-600">ZenMart </Link >
                </div>
                <div className="w-1/3 px-10 py-5">
                    <h1 className="font-Montserrat text-slate-50 h-1/3 font-medium  flex justify-start items-center text-xl" >Want to know more ?</h1>
                    <div className="gap-2 flex h-2/3 flex-col justify-center items-start" >
                        <Link className=" text-slate-300 font-Montserrat font-normal" >Objective</Link>
                        <Link className=" text-slate-300 font-Montserrat font-normal" >About us</Link>
                        <Link className=" text-slate-300 font-Montserrat font-normal" >Project</Link>
                    </div>
                </div>
                <div className="w-1/3 flex justify-center items-center flex-col gap-5 h-full px-10">
                    <h1 className="font-Montserrat font-medium w-full text-xl h-1/6 flex justify-start items-end ">Follow us on</h1>
                    <div className="w-full flex justify-between flex-col text-2xl items-start h-1/2 ">
                        <a href="https://www.instagram.com/amitabh.x3/" target="_blank" className="hover:text-red-600 text-slate-300 text-sm font-Montserrat " >Instagram <FontAwesomeIcon className="text-xs" icon={faArrowRight}/> </a>
                        <a href="https://www.linkedin.com/in/dutta-amitab12345/" target="_blank" className="hover:text-red-600 text-slate-300 text-sm font-Montserrat " >LinkedIn <FontAwesomeIcon className="text-xs" icon={faArrowRight}/> </a>
                        <a href="https://github.com/Amitabh8876" target="_blank" className="hover:text-red-600 text-slate-300 text-sm font-Montserrat " >GitHub <FontAwesomeIcon className="text-xs" icon={faArrowRight}/> </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Footer