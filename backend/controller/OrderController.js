const Order=require('../model/OrderModel');
const Product = require('../model/productSchema');
const Errors = require('../utils/Errors');
const TryAndCatchAsyncErrors = require('../middleware/TryAndCatchAsyncErrors');


exports.newOrderPlace=TryAndCatchAsyncErrors(async(req,res,next)=>{
    const{shippinginfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        }=req.body;

        const order=await Order.create({
            shippinginfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
        })

        res.status(201).json({
            success:true,
            order
        });
});

exports.GetSingleOrder=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const order=Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(Errors("Order not found",404));
    }

    res.status(200).json({
        success:true,
        order
    })
})

exports.MyOrder=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const order=Order.find({user:req.user._id});
  

    res.status(200).json({
        success:true,
        order
    })
})
exports.GetAllOrders=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const orders=Order.find();
    let totalAmt=0;
    orders.forEach((order)=>{
        totalAmt+=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        totalAmt,
        orders
    })
})

exports.UpdateOrderStatus=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const order=Order.findById(req.params.id);
    if(!order){
        return next(Errors("Order not found",404));
    }
    
    if(order.orderStatus==="Delivered"){
        return next(Errors("Order already Delivered",400));
    }

    order.orderItems.forEach(async(order)=>{
        await UpdateStock(order.product,order.quantity);
    })

    order.orderStatus=req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
})

exports.DeleteOrder=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const order=Order.findById(req.params.id);
    if(!order){
        return next(Errors("Order not found",404));
    }
   await order.remove();

    res.status(200).json({
        success:true,
        
    })
})



async function UpdateStock(id,quantity){
    const product=Product.findById(id);
    product.Stock-=quantity;
    await product.save({validateBeforeSave:false})

}






