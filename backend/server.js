const app=require('./app');



const  cloudinary=require('cloudinary');
const DBConnect=require('./config/database');

process.on("uncaughtException",(err)=>{
    console.log(`${err.message}`);
    console.log("Shutting the error uncaughtError");
    process.exit(1);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
//connect    
DBConnect();

cloudinary.config({

    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const PORT=process.env.PORT||3000
let server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

process.on("unhandledRejection",(err)=>{
    console.log(`${err.message}`);

    server.close(()=>{
        process.exit(1);
    })

})