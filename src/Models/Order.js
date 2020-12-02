const mongoose = require('mongoose');


const productSchema = {
    productId: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
}

const orderSchema = mongoose.Schema({
    orderId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    products: { type: Array, default: [] },
    address: { type: String, required: true },
    date: { type: String, required: true },
    total: { type: Number, required: true },
    discount: { type: Number, required: true },
    delieveryFee:{type:Number,required:true},
    status:{type:String,required:true}
})


module.exports = mongoose.model('Orders', orderSchema)