const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    name:{type:String,required:true},
    email:{type:String,unique:true,match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password:{type:String,required:true},
    profileImg:{type:String},
    pushToken:{type:String}
 
})

module.exports = mongoose.model('Users',userSchema);