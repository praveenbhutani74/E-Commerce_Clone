import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newReviewReducer,
  productReducer,
  SingleProductDetailsReducer,
} from "./reducers/productReducer";
import { UserReducer } from "./reducers/UserReducer";
import {
  forgotPasswordReducer,
  Profilereducer,
} from "./reducers/ProfileReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: SingleProductDetailsReducer,
  user: UserReducer,
  profile: Profilereducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
