import Axios from "axios";
import { CART_EMPTY } from "../constant/cartConstant";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCESS
} from "../constant/orderConstant";

export const createdOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userAuth: { userInfo }
    } = getState();
    const { data } = await Axios.post("api/orders", order, {
      headers: {
        authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({ type: ORDER_CREATE_SUCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    // cleaning the array of cartitems saved in local storage
    localStorage.removeItem("cartItems");
  } catch (err) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: err.msg });
  }
};
