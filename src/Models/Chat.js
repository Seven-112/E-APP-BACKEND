const mongoose = require('mongoose');


const chatSchema = {
    userId:{ type: mongoose.Types.ObjectId, required: true },
    chatId: { type: mongoose.Types.ObjectId, required: true },
    user: { type: Object, required: true },
}




module.exports = mongoose.model('Chats', chatSchema)