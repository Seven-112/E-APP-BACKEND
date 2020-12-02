const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const User = require('../Models/User');
const Address = require('../Models/Address');




router.post('/', (req, res) => {


    User.find({ userId: req.body.userId }).exec().then(user => {
        if (user.length === 0) {
            return res.status(401).json({
                message: "User not found",
                success: false,
                status: 403
            })
        } else {
            const address = new Address({
                addressId: new mongoose.Types.ObjectId(),
                userId: req.body.userId,
                address: req.body.address,
                label:req.body.label
            })
            address.save().then(result => {
                return res.status(201).json({
                    message: "Address Posted Successfully",
                    status: 201,
                    success: true,
                    address:address
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
    Address.find().exec().then(result => {
        if (result.length != 0) {
            return res.status(200).json({
                message: "Address found",
                status: 200,
                success: true,
                Address: result
            })
        } else {
            return res.status(401).json({
                message: "No Address Found",
                success: false,
                status: 401

            })
        }
    })
});

router.post('/specific', (req, res) => {
    Address.find({ userId: req.body.userId }).exec()
        .then(result => {
            if (result.length === 0) {
                return res.status(401).json({
                    message: "No Address found",
                    status: 401,
                    success: false
                })
            } else {
                return res.status(200).json({
                    message: "Address Found",
                    success: true,
                    status: 200,
                    Address: result

                })
            }
        })
})



module.exports = router