const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Owner = require('../Models/Owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/signup', (req, res, next) => {


    console.log(req.body)
    Owner.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "EMAIL ALREADY EXISTS"
                });
            } else {

                
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new Owner({
                            ownerId: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            shopName:req.body.shopName,
                            email: req.body.email,
                            password: hash,
                            shopImage: req.body.shopImage,
                            pushToken:req.body.pushToken
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    status: 201,
                                    sucess: true,
                                    message: "USER SIGNED UP SUCCESSFULLY"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json({
                                    error: err
                                });
                            })
                    }
                });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });

});



router.post('/login', (req, res) => {


    console.log(req.body)
    Owner.find({ email: req.body.email })
        .exec()
        .then(owner => {
            console.log(owner)
            if (owner.length === 0) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    message: "EMAIL ADDRESS IS NOT CORRECT TRY AGAIN"
                });
            } else {
         
                bcrypt.compare(req.body.password, owner[0].password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: owner[0].email,
                            ownerId: owner[0]._id,
                        }, "secret",
                            {
                                expiresIn: "3600"
                            }
                        )
                        Owner.updateOne({ email: req.body.email }, { $set: { pushToken: req.body.pushToken } }).exec()
                        .then(result => {
                            Owner.find({ email: req.body.email }).exec()
                                .then(owner => {
                                    console.log(result);
                                    return res.status(200).json({
                                        message: "AUTH SUCCESSFULL",
                                        owner: owner[0],
                                        expiresIn: "3600",
                                        token:token
                                    });
                                })

                        }).catch(err => {
                            console.log(err);
                            res.status(400).json({
                                error: err
                            });
                        });

                    }else{
                        console.log("indide two")
                        return res.status(401).json({
                            status: 401,
                            success: false,
                            message: "PASSWORD DOESNOT MATCH"
                        });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });
});





router.post('/forgetPassword', (req, res, next) => {

    console.log(req.body)
    Owner.find({ email: req.body.email }).exec()
        .then(owner => {
            console.log(owner)
            if (owner.length === 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "NO USER FOUND"
                });
            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                
                        
                        Owner.updateOne({email:req.body.email},{$set:{password:hash}}).exec()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    status: 201,
                                    sucess: true,
                                    message: "PASSWORD CHANGED SUCCESSFULLY",
                                    
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json({
                                    error: err
                                });
                            })
                    }
                });

            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });

});







router.delete('/:ownerId', (req, res, next) => {
    Owner.remove({ _id: req.params.userId }).exec()
        .then(result => {
            res.status(200).json({
                message: "Owner DELETED"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });


});


router.post('/getToken', (req, res, next) => {
    console.log(req.body)
    Owner.find({ ownerId: '5fb5fbf2438e7f240e17a869' }).exec()
        .then(result => {
            console.log(result)
           return res.status(200).json({
                success:true,
                token:result[0].pushToken
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                message: err,
                success:false
            });
        });


});


module.exports = router