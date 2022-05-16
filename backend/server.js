const app=require('./app');


const dotenv=require('dotenv');
const DBConnect=require('./config/database');

process.on("uncaughtException",(err)=>{
    console.log(`${err.message}`);
    console.log("Shutting the error uncaughtError");
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"});
//connect    
DBConnect();

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