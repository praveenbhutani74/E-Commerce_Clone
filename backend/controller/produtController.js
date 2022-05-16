
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

    const result=8;
    const ProductCount= await Product.countDocuments();

    const FeatureOfApis= new FeatureOfApi(Product.find(),req.query).search().filter().pagination(result);
    
    const product = await FeatureOfApis.query;
   

    res.status(200).json({
        success: true,
        product,
        ProductCount
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