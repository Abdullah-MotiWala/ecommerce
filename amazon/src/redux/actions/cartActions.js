import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_PAYMENY_METHOD,
  SHIPPING_ADDRESS_SAVE
} from "../constant/cartConstant";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/product/${productId}`);
  const detail = data.product;
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: detail.name,
      image: detail.image,
      price: detail.price,
      countInStock: detail.countInStock,
      product: detail._id,
      qty: Number(qty)
    }
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().addToCart.cartItems)
  );
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().addToCart.cartItems)
  );
};

export const saveShippingAddress = (address) => async (dispatch) => {
  dispatch({ type: SHIPPING_ADDRESS_SAVE, payload: address });
  localStorage.setItem("shippingAddress", JSON.stringify(address));
};


export const savePaymentMethod = (paymentMethod) => async (dispatch)=>{
  dispatch({type:SAVE_PAYMENY_METHOD,payload:paymentMethod})
}