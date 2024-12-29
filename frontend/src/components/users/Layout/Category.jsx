import React from "react";
import { NavLink } from "react-router-dom";

function Category(){
    const primaryCol = '#151e25';
    const primaryAcs = '#8da6bc';
    const secondryCol = '#c33702';
    const secondryAcs = '#dde1e4';
    return(
        <>
        <div className="bg-white h-14 px-10 flex justify-center gap-10 items-center w-full shadow-sm" >
            <NavLink to={'/user/category/mobiles'} className={ ({isActive}) => `${isActive ? `bg-[#151e25] text-slate-100 ` : `text-slate-950`} w-40 h-2/3 flex justify-center items-center border rounded-lg  text-sm font-semibold uppercase`}>Mobiles</NavLink>
            <NavLink to={'/user/category/fashion'} className={ ({isActive}) => `${isActive ? `bg-[#151e25] text-slate-100 ` : `text-slate-950`} w-40 h-2/3 flex justify-center items-center border rounded-lg  text-sm font-semibold uppercase`}>Fashion</NavLink>
            <NavLink to={'/user/category/electronics'} className={ ({isActive}) => `${isActive ? `bg-[#151e25] text-slate-100 ` : `text-slate-950`} w-40 h-2/3 flex justify-center items-center border rounded-lg  text-sm font-semibold uppercase`}>Electronics</NavLink>
            <NavLink to={'/user/category/furnitures'} className={ ({isActive}) => `${isActive ? `bg-[#151e25] text-slate-100 ` : `text-slate-950`} w-40 h-2/3 flex justify-center items-center border rounded-lg  text-sm font-semibold uppercase`}>Furniture</NavLink>
            <NavLink to={'/user/category/appliances'} className={ ({isActive}) => `${isActive ? `bg-[#151e25] text-slate-100 ` : `text-slate-950`} w-40 h-2/3 flex justify-center items-center border rounded-lg  text-sm font-semibold uppercase`}>Appliances</NavLink>
            <NavLink to={'/user/category/books'} className={ ({isActive}) => `${isActive ? `bg-[#151e25] text-slate-100 ` : `text-slate-950`} w-40 h-2/3 flex justify-center items-center border rounded-lg  text-sm font-semibold uppercase`}>Books</NavLink>
        </div>
        </>
    )
}

export default Category