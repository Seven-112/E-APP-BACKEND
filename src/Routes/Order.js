const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const User = require('../Models/User');
const Product = require('../Models/Product');
const Order = require('../Models/Order');


// const productSchema = {
//     productId:{type:mongoose.Types.ObjectId,required:true},
//     name:{type:String,required:true},
//     quantity:{type:Number,required:true},
//     unitPrice:{type:Number,required:true}
// }

// const orderSchema = mongoose.Schema({
//     orderId:mongoose.Types.ObjectId,
//     products:{type:Array,default:[productSchema]},
//     address:{type:String,required:true},
//     date:{type:String,required:true}
// userId:req.body.userId,
// Total:{type:Number,required:true},
// discount:{type:Number,required:true}
// })

router.post('/', (req, res) => {


    User.find({ userId: req.body.userId }).exec().then(user => {
        if (user.length === 0) {
            return res.status(401).json({
                message: "User not found",
                success: false,
                status: 403
            })
        } else {
            const order = new Order({
                orderId: new mongoose.Types.ObjectId(),
                userId: req.body.userId,
                products: req.body.products,
                address: req.body.address,
                date: new Date(),
                total: req.body.total,
                discount: req.body.discount,
                delieveryFee: req.body.delieveryFee,
                status: "pending"
            })
            order.save().then(result => {
                return res.status(201).json({
                    message: "Order Successfull",
                    status: 201,
                    success: true,
                    order: order

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
    Order.find().exec().then(result => {
        if (result.length != 0) {
            return res.status(200).json({
                message: "Orders found",
                status: 200,
                success: true,
                Orders: result
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

router.post('/specific', (req, res) => {
    Order.find({ userId: req.body.userId }).exec()
        .then(result => {
            if (result.length === 0) {
                return res.status(401).json({
                    message: "No Orders found",
                    status: 401,
                    success: false
                })
            } else {
                return res.status(200).json({
                    message: "Orders Found",
                    success: true,
                    status: 200,
                    orders: result

                })
            }
        })
})


router.post('/updateStatus', (req, res) => {

    Order.find({ orderId: req.body.orderId }).exec()
        .then(result => {
            if (result.length === 0) {
                return res.status(401).json({
                    message: "No Orders found",
                    status: 401,
                    success: false
                })
            } else {
                Order.update(
                    { orderId: req.body.orderId },
                    { $set: { "status": req.body.status } }

                ).exec().then(response => {
                    return res.status(200).json({
                        message: "UPDATED SUCCESSFULLY",
                        status: 200,
                        success: true
                    })
                })
            }
        })
})




module.exports = router