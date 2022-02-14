import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  productListReducers,
  productDetailsReducer
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";

const initialState = {
  addToCart : {
    cartItems : localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
  }
};
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducer,
  addToCart: cartReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
