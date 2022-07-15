import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension"
import { productReducer, SingleProductDetailsReducer } from "./reducers/productReducer";
import { UserReducer } from "./reducers/UserReducer";
import { forgotPasswordReducer, Profilereducer } from "./reducers/ProfileReducer";
import { cartReducer } from "./reducers/cartReducer";


const reducer=combineReducers({
products: productReducer,
productDetails: SingleProductDetailsReducer,
user:UserReducer,
profile: Profilereducer,
forgotPassword:forgotPasswordReducer,
cart:cartReducer,
})

let initialState={

  cart:{
    cartItems:localStorage.getItem("cartItems")?
    JSON.parse(localStorage.getItem("cartItems")):[],
  }

};

const middleware=[thunk];

const store = createStore(
    reducer,
    initialState,
    
    composeWithDevTools(applyMiddleware(...middleware))
  );

export default store;