import axios from "axios";
import {
  CLEAR_ERROR,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  SINGLEORDER_DETAILS_FAIL,
  SINGLEORDER_DETAILS_REQUEST,
  SINGLEORDER_DETAILS_SUCCESS,
} from "../constants/OrderConstant";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);

   
   
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message 
    });
  }
};



export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type:MY_ORDERS_REQUEST });

   
    const { data } = await axios.get("/api/v1/orders/me");

   
   
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message 
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type:SINGLEORDER_DETAILS_REQUEST });

   
    const { data } = await axios.get(`/api/v1/order/${id}`);

   
   
    dispatch({ type: SINGLEORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: SINGLEORDER_DETAILS_FAIL,
      payload: error.response.data.message 
    });
  }
};



export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};