const mongoose = require('mongoose');


const addressSchema = {
    addressId:{type:mongoose.Types.ObjectId},
    userId: { type: mongoose.Types.ObjectId,required:true },
    address: { type: String, required: true },
    label:{type:String}
}

module.exports = mongoose.model('Address',addressSchema);