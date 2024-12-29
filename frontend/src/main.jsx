import './index.css'
import { StrictMode } from 'react'
import Home from './components/Home.jsx'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import Userhome from './components/users/Userhome.jsx'
import Usersearch from './components/users/Usersearch.jsx'
import Paymentpage from './components/users/Paymentpage.jsx'
import Producthome from './components/users/Producthome.jsx'
import UserLogin from './components/users/Auth/UserLogin.jsx'
import AdminOrders from './components/admins/AdminOrders.jsx'
import AdminProduct from './components/admins/AdminProducts.jsx'
import AdminLogin from './components/admins/Auth/AdminLogin.jsx'
import CreateProduct from './components/admins/CreateProduct.jsx'
import AdminDiscount from './components/admins/AdminDiscounts.jsx'
import CreateDiscount from './components/admins/CreateDiscount.jsx'
import UserRegister from './components/users/Auth/UserRegister.jsx'
import AdminDashboard from './components/admins/AdminDashboard.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllUsers from './components/admins/AllUser.jsx'
import AdminAccount from './components/admins/AdminAccount.jsx'
import CreateAdmin from './components/admins/CreateAdmin.jsx'
import AdminRegisterText from './components/admins/Auth/AdminRegisterText.jsx'
import UpdateProduct from './components/admins/UpdateProduct.jsx'
import AllProducts from './components/users/AllProducts.jsx'
import MobileProduct from './components/users/MobileProduct.jsx'
import FashionProduct from './components/users/FashionProduct.jsx'
import ElectronicProduct from './components/users/ElectronicsProduct.jsx'
import FurnitureProduct from './components/users/FurnitureProduct.jsx'
import AppliancesProduct from './components/users/AppliancesProduct.jsx'
import BooksProduct from './components/users/BooksProduct.jsx'
import UserAccount from './components/users/UserAccount.jsx'
import UserOrder from './components/users/UserOrders.jsx'
import UserCart from './components/users/UserCart.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'admin',
                children: [
                    {
                        path: 'dashboard', 
                        element: <AdminDashboard />
                    },
                    {
                        path: 'login', 
                        element: <AdminLogin />
                    },
                    {
                        path: 'register', 
                        element: <AdminRegisterText />
                    },
                    {
                        path: 'products', 
                        element: <AdminProduct />
                    },
                    {
                        path: 'createproducts', 
                        element: <CreateProduct />
                    },
                    {
                        path: 'orders', 
                        element: <AdminOrders />
                    },
                    {
                        path: 'discounts', 
                        element: <AdminDiscount />
                    },
                    {
                        path: 'creatediscount', 
                        element: <CreateDiscount />
                    },
                    {
                        path: 'allusers', 
                        element: <AllUsers />
                    },
                    {
                        path: 'account', 
                        element: <AdminAccount />
                    },
                    {
                        path: 'createadmin', 
                        element: <CreateAdmin />
                    },
                    {
                        path: 'updateproduct/:id', 
                        element: <UpdateProduct />
                    },
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: '', 
                        element: <Userhome /> 
                    },
                    {
                        path: 'login', 
                        element: <UserLogin />
                    },
                    {
                        path: 'register',
                        element: <UserRegister />
                    },
                    {
                        path: 'producthome/:id',
                        element: <Producthome />
                    },
                    {
                        path: 'paymentpage/:id',
                        element:<Paymentpage /> 
                    },
                    {
                        path: 'search',
                        element: <Usersearch />
                    },
                    {
                        path: 'account',
                        element: <UserAccount />
                    },
                    {
                        path: 'orders',
                        element: <UserOrder />
                    },
                    {
                        path: 'cart',
                        element: <UserCart />
                    },
                    {
                        path: 'category',
                        children: [
                            {
                                path: '',
                                element: <AllProducts />
                            },
                            {
                                path: 'mobiles',
                                element: <MobileProduct />
                            },
                            {
                                path: 'fashion',
                                element: <FashionProduct />
                            },
                            {
                                path: 'electronics',
                                element: <ElectronicProduct />
                            },
                            {
                                path: 'furnitures',
                                element: <FurnitureProduct />
                            },
                            {
                                path: 'appliances',
                                element: <AppliancesProduct />
                            },
                            {
                                path: 'books',
                                element: <BooksProduct />
                            },
                        ]
                    },
                ]
            },
        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Toaster position='top-center' reverseOrder={true} />
        <RouterProvider router={router} />
  </StrictMode>
)