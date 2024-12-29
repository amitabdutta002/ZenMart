import { faArrowRightFromBracket, faBox, faChartLine, faHome, faPercent, faTruck, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"

function Header(){
    const navigate = useNavigate();

    const handleLogout = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/admin/logout');
        sessionStorage.removeItem('AdminAccessToken')
        sessionStorage.removeItem('AdminName')
        sessionStorage.removeItem('AdminID')
        navigate('/admin/login');
    }

    return(
        <>
        <div className="fixed top-0 w-80 h-screen shadow-xl rounded-r-xl flex justify-between items-center flex-col ">
            <div className="w-full h-2/3 flex justify-evenly items-start px-10 flex-col ">
                <div className="text-4xl font-bold text-center text-red-600 font-Montserrat ">ZenMart</div>
                <NavLink to={'/admin/dashboard'} className={({isActive})=>`text-lg font-medium px-5 py-2 ${isActive ? 'text-indigo-700 outline outline-1 outline-indigo-700 w-full rounded-lg shadow-md  ' : 'text-slate-500' }`} ><FontAwesomeIcon icon={faHome}/> Dashboard</NavLink>
                <NavLink to={'/admin/products'} className={({isActive})=>`text-lg font-medium px-5 py-2 ${isActive ? 'text-indigo-700 outline outline-1 outline-indigo-700 w-full rounded-lg shadow-md  ' : 'text-slate-500' }`} ><FontAwesomeIcon icon={faBox}/> Product</NavLink>
                <NavLink to={'/admin/orders'} className={({isActive})=>`text-lg font-medium px-5 py-2 ${isActive ? 'text-indigo-700 outline outline-1 outline-indigo-700 w-full rounded-lg shadow-md  ' : 'text-slate-500' }`} ><FontAwesomeIcon icon={faTruck}/> Order</NavLink>
                <NavLink to={'/admin/discounts'} className={({isActive})=>`text-lg font-medium px-5 py-2 ${isActive ? 'text-indigo-700 outline outline-1 outline-indigo-700 w-full rounded-lg shadow-md  ' : 'text-slate-500' }`} ><FontAwesomeIcon icon={faPercent}/> Discounts </NavLink>
                {/* <NavLink to={'/admin/analysis'} className={({isActive})=>`text-lg font-medium px-5 py-2 ${isActive ? 'text-indigo-700 outline outline-1 outline-indigo-700 w-full rounded-lg shadow-md  ' : 'text-slate-500' }`} ><FontAwesomeIcon icon={faChartLine}/> Analysis </NavLink> */}
            </div>
            <div className=" w-full h-1/4 flex justify-center items-start flex-col gap-5 px-10">
                <NavLink to={'/admin/account'} className={'outline outline-1  outline-slate-500 hover:outline-none w-full h-1/3 px-10 flex justify-center font-medium items-center gap-3 text-xl rounded-xl hover:shadow-lg hover:text-white hover:bg-gradient-to-r from-indigo-600 to-violet-700 '} ><FontAwesomeIcon icon={faUser}/> Account</NavLink>
                <button onClick={handleLogout} className="outline outline-1  outline-slate-500 hover:outline-none w-full h-1/3 px-10 flex justify-center font-medium items-center gap-3 text-xl rounded-xl hover:shadow-lg hover:text-white hover:bg-red-600" ><FontAwesomeIcon icon={faArrowRightFromBracket}rotation={180}/> Logout</button>
            </div>
        </div>
        </>
    )
}

export default Header