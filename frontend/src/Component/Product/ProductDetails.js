import React, { Fragment, useEffect } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { getProductDetails } from '../../actions/productaction';
import {useParams} from 'react-router-dom'

import Carousel from 'react-material-ui-carousel';

const ProductDetails = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const {product,loading,error} =useSelector((state)=> state.productDetails);
  console.log(product);
  useEffect(()=>{
    dispatch(getProductDetails(id))
  },[dispatch,id]);

  return (
    <Fragment>
      <div>
      <Carousel>
        {product.images && 
        product.images.map((item,i)=>(
          <img 
          className='CarouselImage'
          src={item.url}
          key={item.url}
          alt={`${i} Slide`}

          />
        ))
        }
      </Carousel>

    </div>
    </Fragment>
  )
}

export default ProductDetails