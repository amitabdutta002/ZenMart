import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    product:{
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
},{
    timestamps: true
});

 export const Order = mongoose.model('Order', orderSchema);