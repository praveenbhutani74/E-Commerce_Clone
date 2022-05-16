const mongoose = require('mongoose');

const productSchemas = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Product Name"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [7, "Price not more than 7 digits"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }

    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    Stock:{
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [7, "Price not more than 4 character"],
        default:1
    },
    reviews:[
        {
            name:{
                type:String,
                require:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }


})

const Product=mongoose.model("Product",productSchemas);
module.exports=Product;
