import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const insertProducts = asyncHandler(async(req,res)=>{
        const {name, description, stock, category, price} = req.body
        console.log([name,description,stock,category,price]);
        
        if (!name || !description || !req.file || !category || !price){
            throw new ApiError(403, "All fields are required");
        }
    
        const existingProduct = await Product.findOne({description});
        if (existingProduct) {
            throw new ApiError(440,"Product already exist")

        }

        const productImageLocalPath = req.file.path;
        if (!productImageLocalPath) {
            throw new ApiError(412,"Product image is required")
        }

        const productImage = await uploadOnCloudinary(productImageLocalPath)
        
        if (!productImage) {
            throw new ApiError(413,"Unable to upload on cloudinary")
        }

        const product = await Product.create({
            name,
            description,
            stock,
            image: productImage.url,
            category,
            price
        })
    
        const createdProduct = await Product.findById(product._id)
        if (!createdProduct) {
            throw new ApiError(500,"Somthing went wrong while registering product")
        }
        
        return res
        .status(201)
        .json(
            new ApiResponse (201, createdProduct,"Product added Successfully")
        )
})

const deleteProduct = asyncHandler(async(req,res)=>{
        const { id } = req.query;
        console.log(id);
    
        const product = await Product.findById(id)
        if (!product) {
            throw new ApiError(404,"Product not found")
        }

        const deletedProduct = await Product.deleteOne({
            _id: id
        })
        
        return res
        .status(200)
        .json(
            new ApiResponse(200,deletedProduct,"Product deleted Successfully")
        )
})

const updateProduct = asyncHandler(async(req,res)=>{
    const { id } = req.query
    const {name, description, stock, category, price} = req.body
    
    console.log({name, description, stock, category, price});
        

    if (!name || !description || !stock || !category || !price ) {
        throw new ApiError(402,'All fileds are required')   
    }

    
    const product = await Product.findById(id)
    if (!product) {
        throw new ApiError(404,"Product not found")
    }

    product.name = name || name
    product.description = description || description
    product.stock = stock || stock
    product.category = category || category
    product.price = price || price

    const updatedProduct = await product.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedProduct ,"Product updated Successfully")
    )
})

const findOneProduct = asyncHandler(async (req, res) => {
        const { productName } = req.body;

        const product = await Product.find({ name: { $regex: productName, $options: 'i' } });

        if (!product) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "Product not found"));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, product, "Product found"));
});


const getProducts = asyncHandler ( async (req,res)=>{
    try {
        const products = await Product.find().sort({createdAt: -1});
        if (!products) {
            throw new ApiError(404,'Product not found!')
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, products, "All products")
        )
    } catch (error) {
        throw new ApiError(403,"Product fetching failed")
    }
})


export {insertProducts, deleteProduct, updateProduct, findOneProduct, getProducts}