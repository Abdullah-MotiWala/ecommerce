import Axios from "axios";
import {
  USER_SIGNIN_FAILED,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCESS,
  USER_SIGNUP_REQUEST
} from "../constant/authConstant";
export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("api/users/signin", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_SIGNIN_FAILED, payload: err.message });
  }
};

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("api/users/signup", {
      email,
      password,
      name
    });
    dispatch({ type: USER_SIGNIN_SUCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_SIGNIN_FAILED, payload: err.message });
  }
};
