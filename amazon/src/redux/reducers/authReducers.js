import {
  USER_SIGNIN_FAILED,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCESS
} from "../constant/authConstant";

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCESS:
      return {
        loading: false,
        userInfo: action.payload
      };

    case USER_SIGNIN_FAILED:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
