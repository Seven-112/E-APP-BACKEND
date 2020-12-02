const mongoose = require('mongoose');


const salesSchema = mongoose.Schema({
    
    productId:mongoose.Types.ObjectId,
    type:{type:String,required:true}

});


module.exports = mongoose.model('HotSales',salesSchema);