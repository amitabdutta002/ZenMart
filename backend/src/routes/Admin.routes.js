import { Router } from "express";
import { upload } from "../middlewares/Multer.middleware.js";
// import { verifyjwt } from "../middlewares/Auth.middleware.js";
import { getDashboardData } from "../controllers/Dashboard.contollers.js";
import { registerAdmin,loginAdmin,logoutAdmin, getAdmin, deleteAdmin, updatePassword } from "../controllers/Admin.contollers.js";
import { deleteProduct, getProducts, insertProducts, updateProduct } from "../controllers/Products.contollers.js";
import { getOrder, updateOrder } from "../controllers/Order.controllers.js";
import { createDiscount, getDiscounts, updateDiscount } from "../controllers/Discount.controllers.js";

const adminRoute = Router()
// ADMIN ROUTE
adminRoute.route('/getadmin').post(getAdmin)
adminRoute.route('/deleteadmin').post(deleteAdmin)
adminRoute.route('/updatepassword').put(updatePassword)
// AUTHENTICATION ROUTES
adminRoute.route('/register').post(registerAdmin)
adminRoute.route('/login').post(loginAdmin)
adminRoute.route('/logout').post(logoutAdmin)
// DAHSBOARD ROUTES
adminRoute.route('/dashboard').get(getDashboardData)
// PRODUCTS ROUTES
adminRoute.route('/products').get(getProducts)
adminRoute.route('/createproducts').post(upload.single('productImage'),insertProducts)
adminRoute.route('/deleteproduct').post(deleteProduct)
adminRoute.route('/updateproduct').post(updateProduct)
// ORDERS ROUTES
adminRoute.route('/orders').get(getOrder)
adminRoute.route('/updateorder').post(updateOrder)
// DISCOUNT ROUTES
adminRoute.route('/discount').get(getDiscounts)
adminRoute.route('/creatediscount').post(createDiscount)
adminRoute.route('/updatediscount').post(updateDiscount)

export default adminRoute