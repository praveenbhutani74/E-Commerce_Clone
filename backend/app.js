const express=require('express');
const app=express();
var cookies = require("cookie-parser");
var bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");

const errMiddleWare=require('./middleware/error');

app.use(express.json());
app.use(cookies())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


const product=require('./route/ProductRoute');
const user=require("./route/UserRoute");
const order=require("./route/OrderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

app.use(errMiddleWare);


module.exports=app;