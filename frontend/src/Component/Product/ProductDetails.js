import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productaction";
import { useParams } from "react-router-dom";
import './ProductDetails.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Review from "./Review";
import { Rating } from "@material-ui/lab";

import Carousel from "react-material-ui-carousel";
import Loader from "../Loading/Loader";
import {useAlert } from 'react-alert';


const ProductDetails = () => {
  const alert=useAlert();
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  useEffect(() => {
    if(error){
      alert.error(error);
        dispatch(clearErrors());
    }

    window.scrollTo(0, 0)
    dispatch(getProductDetails(id));
  }, [dispatch, id,alert,error]);

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
                    <button >-</button>
                    <input readOnly type="number" value={1} />
                    <button >+</button>
                  </div>
                 
                  <button
                    className="AddtoCart"
                    disabled={product.Stock < 1 ? true : false}
                    // onClick={addToCartHandler}
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
              
              // onClick={submitReviewToggle} 
              className="submitReview">
               <span className="submitspan">Leave a review</span> 
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {console.log(product.review)}
          {product.reviews && product.reviews[0] ? ( <div className="reviews">
                {product.reviews&& product.reviews.map((review)=> <Review review={review}/>)}

          </div>): (<p className="noReviews"> No Reviews Yet</p> ) }

      
    </Fragment>)}
    </Fragment>
  );
};

export default ProductDetails;
