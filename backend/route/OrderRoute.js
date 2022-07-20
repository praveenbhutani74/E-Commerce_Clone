const express=require('express');
const {   MyOrder, GetAllOrders, UpdateOrderStatus, DeleteOrder, newOrder, myOrders, getSingleOrder } = require('../controller/OrderController');

const router=express.Router();
const { isAuth, AuthRoles } = require('../middleware/Auth');


router.route("/order/new").post(isAuth, newOrder);

router.route("/order/:id").get( isAuth,getSingleOrder);
router.route("/orders/me").get( isAuth,myOrders);
router.route("/admin/orders").get(isAuth,AuthRoles("admin"),GetAllOrders);
router.route("/admin/order/:id").put(isAuth,AuthRoles("admin"),UpdateOrderStatus);
router.route("/admin/order/:id").delete(isAuth,AuthRoles("admin"),DeleteOrder);



module.exports=router;