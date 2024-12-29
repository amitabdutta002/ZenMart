import { faCircleUser, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{ useState} from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Navbar(){
    const [search, setSearch] = useState('');
    const navigate = useNavigate()

    const handleSearch = async () =>{
        if(search === ''){
            toast.error('Product name required')
        }else{
            sessionStorage.setItem('search',search)
            navigate('/user/search')
        }
    }

    return(
        <>
        <div className="bg-white w-full h-16 px-20 flex">
            <div className="w-1/4 h-full flex justify-center items-center text-3xl font-semibold gap-1">
                {/* <Link to={/user/} className="text-red-600">ゼンマート</Link > */}
                <Link to={'/user/'} className="font-Montserrat text-red-600">ZenMart </Link >
            </div>
            <div className="w-1/2 px-5 text-lg flex justify-center items-center"> 
                <input type="text" value={search} onChange={(e)=> (setSearch(e.target.value))} className="bg-slate-100 border-y-[1px] bborder-l-[1px] border-slate-300 text-slate-500 w-full h-2/3 px-5 rounded-l-lg outline-none" placeholder="Search products.." />
                <button onClick={handleSearch} className="w-1/5 bg-slate-800 text-white rounded-r-lg h-2/3" ><FontAwesomeIcon icon={faSearch}/></button>
            </div>
            <div className="w-1/4 h-full text-[#4A4A4A] flex justify-evenly items-center text-xl font-medium gap-5  px-5 ">
                <Link to={'/user/cart'} className="w-1/2 hover:text-slate-800 h-4/5 rounded-lg flex justify-center items-center gap-2" ><FontAwesomeIcon className="text-md" icon={faShoppingCart}/>Cart</Link>
                <Link to={'/user/account'} className="w-1/2 hover:text-slate-800 h-4/5 rounded-3xl flex justify-center items-center gap-2" ><FontAwesomeIcon className="text-3xl" icon={faCircleUser}/></Link>
            </div>
        </div>
        </>
    )
}

export default Navbar