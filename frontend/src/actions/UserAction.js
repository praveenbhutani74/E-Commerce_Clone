import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOADING_USER_REQUEST,
  LOADING_USER_SUCCESS,
  LOADING_USER_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../constants/UserConstant";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};
export const LoadingUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER_REQUEST});
  
    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOADING_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOADING_USER_FAIL, payload: error.response.data.message });
  }
};

export const Logout = () => async (dispatch) => {
  try {
   
  
   await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
