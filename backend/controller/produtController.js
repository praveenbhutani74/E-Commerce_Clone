
const Product = require('../model/productSchema');
const Errors = require('../utils/Errors');
const TryAndCatchAsyncErrors = require('../middleware/TryAndCatchAsyncErrors');
const FeatureOfApi = require('../utils/FeaturesOfApi');


exports.createProduct = TryAndCatchAsyncErrors(async (req, res, next) => {
    req.body.user=req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

module.exports.getAllProducts = TryAndCatchAsyncErrors(async (req, res, next) => {
    
    const resultPerPage=4;
    const ProductCount= await Product.countDocuments();

    const ApiFeature= new FeatureOfApi(Product.find(),req.query).search().filter();
    
    let products= await ApiFeature.query;
    let filteredProductsCount = products.length;
    ApiFeature.pagination(resultPerPage);
   
   

    res.status(200).json({
        success: true,
        products,
        ProductCount,
        resultPerPage,
        filteredProductsCount
    })
})

exports.getSingleProduct = TryAndCatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new Errors("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        product,
       
    })

})


exports.updateProduct = TryAndCatchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new Errors("Product Not Found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = TryAndCatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new Errors("Product Not Found", 404))
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Deleted"
    })
})
exports.CreateProductReview=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const{rating,comment,productId}=req.body;

    const reviewObj={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment

    }


    const product=await Product.findById(productId);

    const isReview=product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString());
    if(isReview){
        product.reviews.foeEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating=rating,
                rev.comment=comment
            }
        })
    }
    else{
        product.reviews.push(reviewObj);
        product.numOfReviews=product.reviews.length;
    }

    let avg=0;
    product.reviews.forEach((rev)=>{
       
            avg=avg+rev.rating
    
    })
    product.ratings=avg/product.reviews.length;

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true
    })
})

exports.GetProductReview=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const product=await Product.findById(req.query.id);

    if(!product){
        return next(new Errors("Product Not found",404));
    }
   res.status(200).json({
        success:true,
        reviews:product.reviews
    })

})


exports.DeleteReview=TryAndCatchAsyncErrors(async(req,res,next)=>{

    const product=await Product.findById(req.query.productId);

    if(!product){
        return next(new Errors("Product Not found",404));
    }

    const reviews=product.reviews.filter((rev)=>{
        rev._id.toString()!=req.query.id.toString()
    });
    let avg=0;
    reviews.forEach((rev)=>{
       
            avg=avg+rev.rating
    
    })
    const ratings=avg/product.reviews.length;
    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

   res.status(200).json({
        success:true,
       
    })

})