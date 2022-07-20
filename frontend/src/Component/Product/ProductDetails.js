import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productaction";
import {  useParams } from "react-router-dom";
import './ProductDetails.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Review from "./Review";
import { Rating } from "@material-ui/lab";

import Carousel from "react-material-ui-carousel";
import Loader from "../Loading/Loader";
import {useAlert } from 'react-alert';
import { addItemsToCart } from "../../actions/cartActions";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { NEW_REVIEW_RESET } from "../../constants/productConstant";






const ProductDetails = () => {
  const alert=useAlert();

  const [quantity,setQuantity]=useState(1);
  const [open,setOpen]=useState(false);
  const[rating,setRating]=useState(0);
  const[comment,setComment]=useState("");


  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const IncreseQuantity=()=>{
   
    if(product.Stock<=quantity) return
    let qty=quantity+1;
    setQuantity(qty);
  }

  const decreaseQuantity=()=>{

    if(1>=quantity) return
  
    let qty=quantity-1;
    setQuantity(qty);
  }

  const submitReviewToggle=()=>{
    open?setOpen(false):setOpen(true);
  }


  const reviewSubmitHandler=()=>{
    const myform=new FormData();

    myform.set("rating",rating);
    myform.set("comment",comment);
    myform.set("productId",id);

    dispatch(newReview(myform));
    setOpen(false);
  }


  const addToCartHandler=()=>{
    dispatch(addItemsToCart(id,quantity));
    alert.success("Items Added To Cart!!")
  }


  useEffect(() => {
    if(error){
      alert.error(error);
        dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    window.scrollTo(0, 0)
    dispatch(getProductDetails(id));
  }, [dispatch, id,alert,error,reviewError,success]);

  return (
    <Fragment>
      {loading ? <Loader/> :(<Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel autoPlay={true} duration={400} interval={4000} indicators={false} >
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  src={item.url}
                  key={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input readOnly type="number" value={quantity} />
                    <button  onClick={IncreseQuantity}>+</button>
                  </div>
                 
                  <button
                    className="AddtoCart"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                  <ShoppingCartIcon style={{marginLeft:"-11px"}} /> <span className="AddtoCartSpan" >Add To Cart</span>
                  
                  </button>
                 
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button 
              
              onClick={submitReviewToggle} 
              className="submitReview">
               <span className="submitspan">Leave a review</span> 
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
          <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

            <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            >
            </textarea>
          </DialogContent>
          <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                <Button onClick={reviewSubmitHandler} >Submit</Button>
          </DialogActions>
          </Dialog>
                {product.reviews && product.reviews[0] ? ( <div className="reviews">
                {product.reviews&& product.reviews.map((review)=> <Review review={review}/>)}

          </div>): (<p className="noReviews"> No Reviews Yet</p> ) }

      
    </Fragment>)}
    </Fragment>
  );
};

export default ProductDetails;
