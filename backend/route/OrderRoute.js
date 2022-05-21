const express=require('express');
const { newOrderPlace, GetSingleOrder, MyOrder, GetAllOrders, UpdateOrderStatus, DeleteOrder } = require('../controller/OrderController');

const router=express.Router();
const { isAuth, AuthRoles } = require('../middleware/Auth');


router.route("/order/new").post( isAuth,newOrderPlace);

router.route("/order/:id").get( isAuth,GetSingleOrder);
router.route("/orders/me").get( isAuth,MyOrder);
router.route("/admin/orders").get(isAuth,AuthRoles("admin"),GetAllOrders);
router.route("/admin/order/:id").put(isAuth,AuthRoles("admin"),UpdateOrderStatus);
router.route("/admin/order/:id").delete(isAuth,AuthRoles("admin"),DeleteOrder);



module.exports=router;