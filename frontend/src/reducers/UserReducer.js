import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_USER_REQUEST,
  LOADING_USER_SUCCESS,
  LOADING_USER_FAIL,
  LOGOUT_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/UserConstant";

export const UserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOADING_USER_REQUEST:
      return {
        loading: true,
        isAuth: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOADING_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
      };
      case LOGOUT_SUCCESS:
        return{
          loading:false,
          user:null,
          isAuth:false,
        }

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };

    case LOADING_USER_FAIL:
      return {
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };
      case LOGIN_FAIL:
        return {
          ...state,
          loading:false,
          error:action.payload
        }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};


export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};