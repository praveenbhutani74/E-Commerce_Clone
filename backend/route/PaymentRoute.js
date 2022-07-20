const express=require('express');
const { processPayment, SendStripeApiKey } = require('../controller/paymentController');

const router=express.Router();
const { isAuth } = require('../middleware/Auth');


router.route("/payment/process").post(isAuth,processPayment);
router.route("/stripeapikey").get(isAuth,SendStripeApiKey);

module.exports=router;