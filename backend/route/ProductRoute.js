const express=require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getSingleProduct,CreateProductReview, GetProductReview, DeleteReview, getAdminProducts } = require('../controller/produtController');
const { isAuth, AuthRoles } = require('../middleware/Auth');


const router=express.Router();


router.route("/products").get( getAllProducts);


router
  .route("/admin/products")
  .get(isAuth, AuthRoles("admin"), getAdminProducts);
  router
  .route("/admin/product/new")
  .post(isAuth, AuthRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isAuth,AuthRoles("admin"), updateProduct);
router.route("/admin/product/:id").delete(isAuth,AuthRoles("admin"),deleteProduct);
router.route("/product/:id").get(getSingleProduct);

router.route("/review").put(isAuth, CreateProductReview);
router.route("/reviews").get(GetProductReview).delete(isAuth,DeleteReview);

module.exports=router;