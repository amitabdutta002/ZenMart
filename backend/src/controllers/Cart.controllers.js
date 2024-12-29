import { Cart } from "../models/Cart.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItem = asyncHandler(async(req,res) => {
    const { name, productId } = req.body
    console.log({name, productId});
    
    if (!name || !productId) {
        throw new ApiError(478,"All fields are required")
    }
    
    const user = await Cart.findOne({ user: name })

    const existingItem = await Cart.findOne({user: name, product: productId.toString()})
    if (existingItem) {
        throw new ApiError(410,"Item exist");
    }

    const userCart = await Cart.create({
        user: name,
        product: productId.toString()
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200, userCart,"Product added")
    )
})

const removeItem = asyncHandler( async(req,res) =>{
    const {name, productId} = req.body
    console.log({name, productId});

    const user = await Cart.findOne({ user: name })
    if (!user) {
        throw new ApiError(404,"User not found")
    }

    const product = await Cart.findOne({ user: name, product: productId })
    if (!product) {
        throw new ApiError(404,"Product not Found")
    }
    
    const deletedItem = await product.deleteOne({ user: name, product: productId })

    return res
    .status(200)
    .json(
        new ApiResponse(200, deletedItem, "Product removed")
    )
})

const clearCart = asyncHandler(async(req,res)=>{
    const { name } = req.body
    console.log(name);

    const user = await Cart.findOne({ user: name })
    if (!user) {
        throw new ApiError(404,'User not found')
    }

    const clean = await Cart.deleteMany({ user: name })

    return res
    .status(200)
    .json(
        new ApiResponse(200, clean, "Cart cleared")
    )
})

const getCartItems = asyncHandler(async(req,res)=>{
    const { name } = req.body
    console.log({name});

    const user = await Cart.findOne({ user: name })
    if (!user) {
        throw new ApiError(404,"User not found")
    }

    const allUserData = await Cart.find({ user: name })

    return res
    .status(200)
    .json(
        new ApiResponse(200, allUserData, 'User data')
    )
})


export { addItem, removeItem, clearCart, getCartItems }