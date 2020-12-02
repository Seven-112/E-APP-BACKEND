const express = require('express');
const app = express();
const ngrok = require('ngrok');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');



const userRoutes = require('./src/Routes/User');
const storageRoutes = require('./src/Routes/Storage');
const productRoutes = require('./src/Routes/Product');
const orderRoutes = require('./src/Routes/Order');
const addressRoutes = require('./src/Routes/Address');
const ownerRoutes = require('./src/Routes/Owner');
const chatRoutes = require('./src/Routes/Chat');

const url ='mongodb+srv://UsmanBajwa:codealpha420@cluster0.qpptl.mongodb.net/E-APP?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }).catch(err=>console.log(err))
mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//HEADERS MIDDLE WARE
app.use((req,res,next)=>{

  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');

 if(req.method === 'OPTIONS'){
   res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
   return res.status(200).json({});
 }

 next();
});





app.use('/user',userRoutes);
app.use('/storage',storageRoutes);
app.use('/product',productRoutes);
app.use('/order',orderRoutes);
app.use('/address',addressRoutes);
app.use('/owner',ownerRoutes);
app.use('/chat',chatRoutes)





app.use((req,res,next)=>{
    const error = new Error("NOT FOUND");
    error.status = 404
    next(error);
})


//catches error from anywhere
app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
  error:{
      message:error.message
  }
  });

});



module.exports = app