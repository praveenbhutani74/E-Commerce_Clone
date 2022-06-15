import axios from 'axios';
import { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL, CLEAR_ERROR, SINGLE_PRODUCTS_REQUEST, SINGLE_PRODUCTS_SUCCESS, SINGLE_PRODUCTS_FAIL } from "../constants/productConstant"


export const getAllProduct=()=>async(dispatch)=>{
    try {
        
        dispatch({
            type:PRODUCTS_REQUEST
        })

        const { data } =await axios.get("/api/v1/products");

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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };