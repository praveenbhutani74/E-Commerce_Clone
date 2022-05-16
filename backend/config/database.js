const mongoose=require('mongoose');


const DBConnect=()=>{

    const DB_URI=process.env.DB_URI|| "mongodb://localhost:27017/NotGet"

mongoose.connect(DB_URI).then((data)=>{
    console.log(`Connected to ${data.connection.host}`);
})
}

module.exports=DBConnect;
