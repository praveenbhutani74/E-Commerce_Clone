const Errors = require('../utils/Errors');
const TryAndCatchAsyncErrors = require('../middleware/TryAndCatchAsyncErrors');
const User = require('../model/UserSchema');
const SendTokenId = require('../utils/Jwtcode');
const EmailSent=require("../utils/EmailSent.js");
const crypto=require('crypto');
const cloudinary=require('cloudinary');

const Product = require('../model/productSchema');



exports.registerUser = TryAndCatchAsyncErrors(async (req, res, next) => {

    const MyCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    });

    const { name, email, password } = req.body;


    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: MyCloud.public_id,
            url: MyCloud.secure_url,
        }

    })
    SendTokenId(user,201,res);
})


exports.loginUser= TryAndCatchAsyncErrors( async (req,res,next)=>{

    const{email,password}=req.body;

    if(!email||!password){
        return next(new Errors("Please Enter Email & Password",400));
    }

    const user=  await User.findOne({email:email}).select("+password");

    if(!user){
        return next(new Errors("Invalid  Email & Password",401));
    }

    const iSPasswordMatch= await user.comparePass(password);

    if(!iSPasswordMatch){
        return next(new Errors("Invalid  Email & Password",401));
    }

    SendTokenId(user,200,res);


})

exports.logout=TryAndCatchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date( Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
});


exports.forgetPassword=TryAndCatchAsyncErrors(async(req,res,next)=>{


    const user=await User.findOne({email:req.body.email})

    if(!user){
        return next(new Errors("User Not Found",404));
    }

    const resetToken=  user.ResetPassWord();
    console.log(resetToken);

    await user.save({validateBeforeSave:false});

    const resetPassUrl=`${process.env.LOCALHOST_URL}/password/reset/${resetToken}`;

    const message=`Your Password Token is:- \n\n ${resetPassUrl} \n\n If you not requestedthis email,
    then ignore it`
    
    try{

        await EmailSent({
            email:user.email,
            subject:'ShoppingStock Password Recovery',
            message
        })
        res.status(200).json({
            success:true,
            message:`Email Sent to ${user.email} succesfully`
        })

    }
    catch(err){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});

        return next(new Errors(err.message,500));
    }



})

exports.resetPassword=TryAndCatchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");


console.log(resetPasswordToken);

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},

    })

    
    if(!user){
        return next(new Errors("reset password token Inalid or expires",400));
    }

    if(req.body.password!=req.body.confirmPassword){
        return next(new Errors("Password does not match!!",404));

    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordToken=undefined;

    await user.save();

    SendTokenId(user,200,res);



})


exports.getUserDetail=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const user= await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})

exports.UpdateUserPassword=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const user= await User.findById(req.user.id).select("+password");

    // console.log(user);

    const iSPasswordMatch=await user.comparePass(req.body.oldPassword);

    if(!iSPasswordMatch){
        return next(new Errors("Old Password is incorrect ",400));
    }

    if(req.body.newPassword!=req.body.confirmPassword){
        return next(new Errors("Password does not match",400));
    }

    user.password=req.body.newPassword;

    await user.save();

    SendTokenId(user,200,res);

})

exports.UpdateNameAndPassword=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
    
      if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
      });

})
//for admin
exports.GetAllUser=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
})
//for admin
exports.GetSingleUser=TryAndCatchAsyncErrors(async(req,res,next)=>{

     const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });

})


exports.UpdateUserRole=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      };
    
      await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
      });
})

exports.deleteUser=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    const imageId = user.avatar.public_id;
  
    await cloudinary.v2.uploader.destroy(imageId);
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
})

