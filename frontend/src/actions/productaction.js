import axios from 'axios';
import { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL, CLEAR_ERROR, SINGLE_PRODUCTS_REQUEST,  UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL, SINGLE_PRODUCTS_SUCCESS, SINGLE_PRODUCTS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL } from "../constants/productConstant"


export const getAllProduct=(keyword = "",currentPage=1,price=[0,50000],category,ratings=0)=>async(dispatch)=>{
    try {
        
        dispatch({
            type:PRODUCTS_REQUEST
        })

        let AllProductLink=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if(category){
            AllProductLink=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const { data } =await axios.get(AllProductLink);
        console.log(data);

        dispatch({
            type: PRODUCTS_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }

}
export const getAdminProduct=()=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_PRODUCTS_REQUEST});

        const {data}=await axios.get("/api/v1/admin/products");
        console.log(data.products);

        dispatch({
            type:ADMIN_PRODUCTS_SUCCESS,
            payload:data.products
        })
    }
    catch(error){
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

export const getProductDetails = (id)=> async(dispatch) =>{
    try {
        dispatch({type:SINGLE_PRODUCTS_REQUEST});

        const {data}= await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:SINGLE_PRODUCTS_SUCCESS,
            payload:data.product
        })

    } catch (error) {
        
        dispatch({
            type:SINGLE_PRODUCTS_FAIL,
            payload: error.response.data.message,
          
        })
        
    }
}
export const newReview = (reviewData)=> async(dispatch) =>{
    try {
        dispatch({type:NEW_REVIEW_REQUEST});

        const config={
            headers:{"Content-Type":"application/json"},
        }

        const {data}= await axios.put(`/api/v1/review`,reviewData,config);

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success,
        })

    } catch (error) {
        
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload: error.response.data.message,
          
        })
        
    }
}

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };