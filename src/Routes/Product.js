const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Product = require('../Models/Product');





router.post('/', (req, res, next) => {


    const product = new Product({
        productId: new mongoose.Types.ObjectId(),
        ownerId: req.body.ownerId,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        productType: req.body.productType,
        rating: '4.2',
        hotsales: req.body.hotsales,
        promotions:req.body.promotions,
        discount:req.body.discount,
        description:req.body.description,
        stock:req.body.stock
    })

    product.save().then(result => {
        return res.status(201).json({
            success: true,
            message: "Product Created SuccessFully",
            status: 201
        })
    }).catch(err => {
        return res.status(401).json({
            message: err,
            success: false,
            status: 401
        })
    })
})

router.post('/specific', (req, res, next) => {
    const id = req.body.productId;
    console.log(id)
    Product.find({productId:req.body.productId}).exec()
        .then(doc => {
            if (doc.length!=0) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    product: doc[0]
                });
            } else {
                return res.status(401).json({ message: "NO VALID ENTRY FOUND FOR PROVIDED ID" });

            }
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});

router.post('/OwnerProducts', (req, res, next) => {
    const id = req.body.ownerId;
    console.log(id)
    Product.find({ownerId:req.body.ownerId}).exec()
        .then(doc => {
            if (doc.length!=0) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    products: doc
                });
            } else {
                return res.status(401).json({ message: "NO VALID ENTRY FOUND FOR PROVIDED ID" });

            }
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });
});



router.get('/', (req, res,next) => {
    Product.find().exec()
        .then(doc => {
            if (doc) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    products: doc
                });
            } else {
                return res.status(401).json({ message: "NO DATA FOUND" });

            }
        })
        .catch(err => {
            return res.status(400).json({ error: err });
        });

});

module.exports = router