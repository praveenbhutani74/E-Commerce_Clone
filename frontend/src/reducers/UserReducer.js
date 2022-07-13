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
    case LOGIN_FAIL:
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
