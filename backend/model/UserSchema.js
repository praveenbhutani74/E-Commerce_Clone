const mongoose=require('mongoose');
const validator=require('validator');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');

const userSchemas=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[30,"Name cannot  more than 30 letters"],
        minlength:[4,"Name should have more than 4 letters"]
    },
    email:{
        type:String,
        required:[true,"Please Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[8,"Password should have more than 8 letters"],
        select:false
        
    },
    avatar:{

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordExpire: Date,

})


userSchemas.pre("save" ,async function(next){
    if(!this.isModified("password")){
        next();
    }
   

    this.password=await bcryptjs.hash(this.password,10);
})

userSchemas.methods.getJWTTokenId=function(){

    return jwt.sign({id:this.id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES_DATE
    })
}

userSchemas.methods.comparePass= async function(pass){

    return await bcryptjs.compare(pass,this.password);
}
userSchemas.methods.ResetPassWord= function(){
    const resetToken= crypto.randomBytes(20).toString("hex");
    console.log(resetToken);

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+ 20* 60* 1000;
    

    return resetToken;
}

const User=mongoose.model("User",userSchemas);
module.exports=User;