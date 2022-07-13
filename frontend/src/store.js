import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension"
import { productReducer, SingleProductDetailsReducer } from "./reducers/productReducer";
import { UserReducer } from "./reducers/UserReducer";
import { Profilereducer } from "./reducers/ProfileReducer";


const reducer=combineReducers({
products: productReducer,
productDetails: SingleProductDetailsReducer,
user:UserReducer,
profile: Profilereducer,
})

let initialState={};

const middleware=[thunk];

const store = createStore(
    reducer,
    initialState,
    
    composeWithDevTools(applyMiddleware(...middleware))
  );

export default store;