import Axios from "axios";
import { CART_EMPTY } from "../constant/cartConstant";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS
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

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAIL_REQUEST, payload: orderId });
  try {
    const {
      userAuth: { userInfo }
    } = getState();
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (err) {
    const message = err.message;
    dispatch({ type: ORDER_DETAIL_FAIL, payload: message });
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userAuth: { userInfo }
    } = getState();
    try {
      const { data } = Axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`
          }
        }
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (err) {
      const message = err.message;
      dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
  };

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userAuth: { userInfo }
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      }
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo }
  } = getState();
  try {
    const { data } = await Axios.get("/api/orders/summary", {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
