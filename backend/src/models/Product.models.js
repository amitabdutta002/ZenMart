import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    },
    category:{
        type:String,
        enum:["Mobiles","Fashion","Electronics","Furniture","Appliances","Books"],
        required:true,
        trim:true
    }

},{timestamps:true})

export const Product = mongoose.model("Product", productSchema)