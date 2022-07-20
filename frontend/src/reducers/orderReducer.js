import { CLEAR_ERROR, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, SINGLEORDER_DETAILS_FAIL, SINGLEORDER_DETAILS_REQUEST, SINGLEORDER_DETAILS_SUCCESS } from "../constants/OrderConstant";



export const newOrderReducer=(state={},action)=>{

  switch (action.type) {
    case CREATE_ORDER_REQUEST:
     return {
      ...state,
      loading:true,

     } 
     case CREATE_ORDER_SUCCESS:
      return {
        loading:false,
        order:action.payload,
      }
      case CREATE_ORDER_FAIL:
        return{
          loading:false,
          error:action.payload,
        }

        case CLEAR_ERROR:
          return{
            ...state,
            error:null,
          }
  
    default:
      return state;
  }
}


export const myOrdersReducer=(state={orders:[] },action)=>{

  switch (action.type) {
    case MY_ORDERS_REQUEST:
     return {
      
      loading:true,

     } 
     case MY_ORDERS_SUCCESS:
      return {
        loading:false,
        orders:action.payload,
      }
      case MY_ORDERS_FAIL:
        return{
          loading:false,
          error:action.payload,
        }

        case CLEAR_ERROR:
          return{
            ...state,
            error:null,
          }
  
    default:
      return state;
  }
}

export const orderDetailsReducer=(state={order:{} },action)=>{

  switch (action.type) {
    case SINGLEORDER_DETAILS_REQUEST:
     return {
      
      loading:true,

     } 
     case SINGLEORDER_DETAILS_SUCCESS:
      return {
        loading:false,
        order:action.payload,
      }
      case SINGLEORDER_DETAILS_FAIL:
        return{
          loading:false,
          error:action.payload,
        }

        case CLEAR_ERROR:
          return{
            ...state,
            error:null,
          }
  
    default:
      return state;
  }
}