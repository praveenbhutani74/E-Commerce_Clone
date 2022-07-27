
const Product = require('../model/productSchema');
const Errors = require('../utils/Errors');
const TryAndCatchAsyncErrors = require('../middleware/TryAndCatchAsyncErrors');
const FeatureOfApi = require('../utils/FeaturesOfApi');
const cloudinary=require('cloudinary');

exports.createProduct = TryAndCatchAsyncErrors(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });
  
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
exports.getAdminProducts = TryAndCatchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });

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
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Images Start Here
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });

exports.deleteProduct = TryAndCatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });
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
        product.reviews.forEach((rev)=>{
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

  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });

})


exports.DeleteReview=TryAndCatchAsyncErrors(async(req,res,next)=>{

  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });

})