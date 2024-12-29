import { Discount } from "../models/Discount.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createDiscount = asyncHandler( async (req,res)=>{
    const { name, description, active, percent, products } = req.body
    console.log({name, description, active, percent, products});

    if (!name || !description || !active || !percent || !products) {
        throw new ApiError(402,"All fileds are required")
    }

    const existingDiscount = await Discount.findOne({description});
    if (existingDiscount) {
        throw new ApiError(410,"Discount already exist");
    }

    const createdDiscount = await Discount.create({
        name: name,
        active: active,
        percent: percent,
        products: products,
        description: description,
    })
    if (!createdDiscount) {
        throw new ApiError(500,'Somthing went wrong while creating Discount')
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, createdDiscount, "Discount created successfully")
    )
})

const getDiscounts = asyncHandler(async(req,res)=>{
    const discounts = await Discount.find().sort({createdAt: -1})
    if (!discounts) {
        throw new ApiResponse(200, discounts, "No discounts found") 
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, discounts, "Discount detalis")
    )
})

const updateDiscount = asyncHandler(async (req, res) => {
    const { id, active } = req.body;
    // console.log({ id, active });

    if (!id || typeof active !== "boolean") {
        throw new ApiResponse(404, null, "Invalid data: ID or active status missing");
    }

    const updatedDiscount = await Discount.findByIdAndUpdate(
        id, 
        { active },
        { new: true }
    );

    if (!updatedDiscount) {
        throw new ApiError(407, null, "Error occurred while updating discount");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedDiscount, "Discount updated successfully")
    );
});


export { createDiscount, getDiscounts ,updateDiscount }