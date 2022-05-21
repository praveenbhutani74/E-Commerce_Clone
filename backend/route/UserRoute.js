
const express=require('express');
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetail, UpdateUserPassword, UpdateNameAndPassword, GetAllUser, GetSingleUser, UpdateUserRole, deleteUser } = require('../controller/userController');
const {isAuth, AuthRoles}=require("../middleware/Auth");

const router=express.Router();



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuth, getUserDetail);
router.route("/password/update").put(isAuth, UpdateUserPassword);
router.route("/me/update").put(isAuth, UpdateNameAndPassword);
router.route("/admin/users").get(isAuth,AuthRoles("admin"),GetAllUser);
router.route("/admin/user/:id").get(isAuth,AuthRoles("admin"),GetSingleUser);
router.route("/admin/user/:id").put(isAuth,AuthRoles("admin"),UpdateUserRole);
router.route("/admin/user/:id").delete(isAuth,AuthRoles("admin"),deleteUser);

module.exports=router;
