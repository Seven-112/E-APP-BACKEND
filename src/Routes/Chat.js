const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Chat = require('../Models/Chat');
const User = require('../Models/User');




// userId:{ type: mongoose.Types.ObjectId, required: true },
//     chatId: { type: mongoose.Types.ObjectId, required: true },
//     user: { type: Object, required: true },

router.post('/', (req, res) => {


    Chat.find({ userId: req.body.userId }).exec().then(user => {
        if (user.length >0) {
            return res.status(401).json({
                message: "User Alredy exists",
                success: false,
                status: 403
            })
        } else {
            const chat = new Chat({
                userId: req.body.userId,
                chatId:req.body.chatId,
                user:req.body.user
            })
            chat.save().then(result => {
                return res.status(201).json({
                    message: "chat saved Successfull",
                    status: 201,
                    success: true,
                    chat: result

                })
            }).catch(err => {
                return res.status(400).json({
                    message: err,
                    status: 400
                })
            })
        }
    })
})


router.get('/', (req, res) => {
    Chat.find().exec().then(result => {
        if (result.length != 0) {
            return res.status(200).json({
                message: "CHAT found",
                status: 200,
                success: true,
                Chats: result
            })
        } else {
            return res.status(401).json({
                message: "No Orders Found",
                success: false,
                status: 401

            })
        }
    })
});

module.exports = router