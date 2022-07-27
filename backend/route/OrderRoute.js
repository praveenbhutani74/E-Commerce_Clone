const express=require('express');
const {   getAllOrders, deleteOrder, newOrder, myOrders, getSingleOrder, updateOrder } = require('../controller/OrderController');

const router=express.Router();
const { isAuth, AuthRoles } = require('../middleware/Auth');


router.route("/order/new").post(isAuth, newOrder);

router.route("/order/:id").get( isAuth,getSingleOrder);
router.route("/orders/me").get( isAuth,myOrders);
router.route("/admin/orders").get(isAuth,AuthRoles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuth,AuthRoles("admin"),updateOrder);
router.route("/admin/order/:id").delete(isAuth,AuthRoles("admin"),deleteOrder);



module.exports=router;