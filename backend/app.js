const express=require('express');
const app=express();
var cookies = require("cookie-parser");
var bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");

const path = require("path");

const errMiddleWare=require('./middleware/error');

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookies())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


const product=require('./route/ProductRoute');
const user=require("./route/UserRoute");
const order=require("./route/OrderRoute");
const payment=require("./route/PaymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errMiddleWare);


module.exports=app;