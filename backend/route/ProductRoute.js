const express=require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controller/produtController');
const { isAuth, AuthRoles } = require('../middleware/Auth');


const router=express.Router();


router.route("/products").get(  getAllProducts);
router.route("/product/new").post( isAuth,AuthRoles("admin"), createProduct);
router.route("/product/:id").put(isAuth,AuthRoles("admin"), updateProduct);
router.route("/product/:id").delete(isAuth,AuthRoles("admin"),deleteProduct);
router.route("/product/:id").get(getSingleProduct);



module.exports=router;