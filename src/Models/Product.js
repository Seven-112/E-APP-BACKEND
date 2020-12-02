const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({

    productId: mongoose.Types.ObjectId,
    ownerId: mongoose.Types.ObjectId,
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    productType: { type: String, required: true },
    rating: { type: Number, required: true },
    hotsales:{type:Boolean,required:true},
    promotions: { type: Boolean, required: true },
    discount:{type:String,required:true},
    description:{type:String,required:true},
    stock:{type:Number}

})

module.exports = mongoose.model('Products',prodSchema);

