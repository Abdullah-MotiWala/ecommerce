import Axios from "axios";
import { CART_ADD_ITEM } from "../constant/cartConstant";

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
      qty
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().addToCart.cartItems));
};
