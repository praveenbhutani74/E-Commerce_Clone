
import { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL, SINGLE_PRODUCTS_REQUEST, SINGLE_PRODUCTS_SUCCESS, SINGLE_PRODUCTS_FAIL, CLEAR_ERROR } from "../constants/productConstant"

export const productReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            };
        case PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
              
                ProductCount: action.payload.ProductCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
                

            };
        case PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

};




export const SingleProductDetailsReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case SINGLE_PRODUCTS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case SINGLE_PRODUCTS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case SINGLE_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;




    }






}