const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');







router.post('/signup', (req, res, next) => {


    console.log(req.body)
    User.find({ email: req.body.email }).exec()
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
                        const user = new User({
                            userId: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            profileImg: req.body.profileImg,
                            pushToken: ''
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
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user)
            if (user.length === 0) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    message: "EMAIL ADDRESS IS NOT CORRECT TRY AGAIN"
                });
            } else {

                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                        }, "secret",
                            {
                                expiresIn: "3600"
                            }
                        )
                        User.updateOne({ email: req.body.email }, { $set: { pushToken: req.body.pushToken } }).exec()
                            .then(result => {
                                User.find({ email: req.body.email }).exec()
                                    .then(user => {
                                        console.log(result);
                                        return res.status(200).json({
                                            message: "AUTH SUCCESSFULL",
                                            user: user[0],
                                            token:token,
                                            expiresIn: "3600"
                                        });
                                    })

                            }).catch(err => {
                                console.log(err);
                                res.status(400).json({
                                    error: err
                                });
                            });

                    } else {
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
    User.find({ email: req.body.email }).exec()
        .then(user => {
            console.log(user)
            if (user.length === 0) {
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



                        User.updateOne({ email: req.body.email }, { $set: { password: hash } }).exec()
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







router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId }).exec()
        .then(result => {
            res.status(200).json({
                message: "USER DELETED"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });


});
router.post('/postNotification', (req, res, next) => {
    User.updateOne({ userId: req.body.userId }, { $set: { pushToken: req.body.pushToken } }).exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                status: 201,
                sucess: true,
                message: "NOTIFICATION CHANGED SUCCESSFULLY",

            });
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error: err
            });
        });


});




module.exports = router