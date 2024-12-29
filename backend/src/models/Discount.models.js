import mongoose from "mongoose";

const discountSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    active:{
        type: Boolean,
        required: true,
        default: false
    },
    percent:{
        type: Number,
        required: true,
        default: 0
    },
    products:{
        type: String,
        enum: ["All","Grocery","Mobiles","Fashion","Electronics","Furniture","Appliances","Toys","Books"],
        required: true,
        default: "All"
    },
},{
    timestamps: true
})

export const Discount = mongoose.model('Discount',discountSchema)