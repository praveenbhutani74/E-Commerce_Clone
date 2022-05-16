const Errors = require("../utils/Errors");
const TryAndCatchAsyncErrors = require("./TryAndCatchAsyncErrors");
const User = require('../model/UserSchema');
const jwt=require('jsonwebtoken');


exports.isAuth=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const{token}=req.cookies;

    if(!token){
        return next(new Errors("Please Login to get access",401));
    }

    const key=jwt.verify(token,process.env.JWT_SECRET_KEY);
    
    req.user= await User.findById(key.id);
   
    next();

})

exports.AuthRoles=(...roles)=>{
    return (req,res,next)=>{
        console.log(roles);
        console.log(req.user.role);

        if(!roles.includes(req.user.role)){

            return next(new Errors(`Role {req.user.role}is not allowed`,403));
        }
        next();
    }
}

