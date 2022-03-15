import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  productListReducers,
  productDetailsReducer
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  // signUpReducers,
  userAuthReducer
  // userSignInReducer
} from "./reducers/authReducers.js";
import { orderReducers } from "./reducers/orderReducers.js";

const initialState = {
  userAuth: {
    userInfo: JSON.parse(localStorage?.getItem("userInfo"))
  },
  addToCart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : []
  }
};
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducer,
  addToCart: cartReducer,
  userAuth: userAuthReducer,
  orderCreate: orderReducers
  // userSignIn: userSignInReducer,
  // userSignUp: signUpReducers
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
