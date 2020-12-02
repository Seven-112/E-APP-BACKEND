const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    ownerId:mongoose.Types.ObjectId,
    name:{type:String,required:true},
    shopName:{type:String,required:true},
    email:{type:String,unique:true,match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password:{type:String,required:true},
    shopImage:{type:String},
    pushToken:{type:String,required:true}
 
})

module.exports = mongoose.model('Owners',ownerSchema);