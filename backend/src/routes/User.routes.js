import { Router } from "express";
import { verifyjwt } from "../middlewares/Auth.middleware.js";
import { registerUser,loginUser,logoutUser, getUser, updatePassword, deleteAccount, updateDetails } from "../controllers/User.contollers.js";
import { findOneProduct, getProducts } from "../controllers/Products.contollers.js";
import { createOrder, getOrderForUser } from "../controllers/Order.controllers.js";
import { getDiscounts } from "../controllers/Discount.controllers.js";
import { addItem, clearCart, getCartItems, removeItem } from "../controllers/Cart.controllers.js";

const userRoute = Router();
userRoute.route('/register').post(registerUser);
userRoute.route('/login').post(loginUser);
userRoute.route('/logout').post(logoutUser);
userRoute.route('/').get(getProducts);
userRoute.route('/query').post(findOneProduct);
userRoute.route('/createorder').post(createOrder);
userRoute.route('/getuserorder').post(getOrderForUser)
userRoute.route('/discount').get(getDiscounts)
userRoute.route('/account').post(getUser)
userRoute.route('/updatepassword').post(updatePassword)
userRoute.route('/deleteaccount').post(deleteAccount)
userRoute.route('/updatedetails').post(updateDetails)
userRoute.route('/additemtocart').post(addItem)
userRoute.route('/deleteitemfromcart').post(removeItem)
userRoute.route('/clearcart').post(clearCart)
userRoute.route('/getusercart').post(getCartItems)

export default userRoute