// import { Axios } from "axios";
import {
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_FAIL
} from "../constant/productContant";

//getting product from backend and showing on home page
export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    // const { products } = await Axios.get("/api/products/fetchproducts");
    const api = fetch("/api/products/fetchproducts");
    const { products } = await api.then((res) => res.json());
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: products
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.message
    });
  }
};

//getting target product using id and showing on product detail page
export const productDetails = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: id });
  const api = fetch(`/api/products/products/${id}`);
  const apiResponse = await api.then((res) => res.json());
  // const { data } = Axios.get(`/api/products/products/${id}`);
  !apiResponse.message
    ? dispatch({
        type: PRODUCT_DETAIL_SUCCESS,
        payload: apiResponse.product
      })
    : dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload: apiResponse.message
      });
};
