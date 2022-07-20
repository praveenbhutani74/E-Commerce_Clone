import axios from 'axios';
import { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL, CLEAR_ERROR, SINGLE_PRODUCTS_REQUEST, SINGLE_PRODUCTS_SUCCESS, SINGLE_PRODUCTS_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL } from "../constants/productConstant"


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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };