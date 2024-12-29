import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    }
}, {
    timestamps: true 
});

export const Cart = mongoose.model('Cart', cartSchema);