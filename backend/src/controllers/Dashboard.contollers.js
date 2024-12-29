import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/Order.models.js";
import { Product } from "../models/Product.models.js";

const getDashboardData = asyncHandler(async(req,res,next)=>{
    try {
        const users = await User.find().sort({createdAt:-1});
        if (!users) {
            throw new ApiError(515,"No users found");
        }

        const orders = await Order.find().sort({createdAt: -1})
        if (!orders) {
            throw new ApiError(515, "No orders found")
        }

        const products = await Product.find().sort({createdAt: -1})
        if (!products) {
            throw new ApiError(515, "No products found")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,[users, orders,products],"Successfully fetched")
        )
    } catch (error){
        console.log("Error fetching users",error);

        return res
        .send(301)
        .json(
            new ApiError(301,"Fetching failed")
        )
    }
    next();
})

export {getDashboardData}