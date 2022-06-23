const Errors=require('../utils/Errors');

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error"


    if(err.name==="CastError"){
        err=new Errors("Resource not found",400);
    }

    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new Errors(message,400);

    }
    if(err==="JsonWebTokenError"){
        const message=`Json Web Token is Inavlid, Try Again`;
        err=new Errors(message,400);
    }
    if(err==="TokenExpiredError"){
        const message=`Json Web Token is Expired, Try Again`;
        err=new Errors(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        error:err.stack
    })
}