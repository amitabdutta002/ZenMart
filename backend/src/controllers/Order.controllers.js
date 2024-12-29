import { Order } from "../models/Order.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler ( async(req,res)=>{
    const { user, product, totalAmount } = req.body
    console.log({user, product, totalAmount});

    if (!user || !product || !totalAmount) {
        throw new ApiError(418,"All fields are required")
    }

    const order = await Order.create({user, product, totalAmount})
    if (!order) {
        throw new ApiError(420,"Order not created")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, order, "Order registered" )
    )
})

const getOrder = asyncHandler(async(req,res)=>{
    try {
        const order = await Order.find().sort({createdAt: -1});
        if (!order) {
            throw new ApiError(404,'Order not found')
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, order, "Order details")
        )
    } catch (error) {
        throw new ApiError(404,"Order fetching failed!")
    }
})

const updateOrder = asyncHandler(async (req, res) => {
    const { id, orderStatus } = req.body;

    if (!id || !orderStatus) {
        throw new ApiError(418, "Order ID and status are required");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { orderStatus },
        { new: true, runValidators: true }
    );

    if (!updatedOrder) {
        throw new ApiError(404, "Order not found or could not be updated");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedOrder, "Order status updated"));
});

const getOrderForUser = asyncHandler(async(req,res)=>{
    const { name } = req.body
    if (!name) {
        throw new ApiError(409,"Name is required")
    }

    const order = await Order.find({ user: name }) 
    if (!order) {
        throw new ApiError(410,"Orders not found")
    }
    if (order.length === 0) {
        throw new  ApiError(410,"No orders found for this user")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, order, "Order details")
    )

})


export { createOrder, getOrder, updateOrder, getOrderForUser }