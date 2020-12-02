const mongoose = require('mongoose');

const storageSchema = mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    
 
})

module.exports = mongoose.model('Users',userSchema);