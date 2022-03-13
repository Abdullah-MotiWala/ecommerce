import {
  USER_SIGNIN_FAILED,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAILED,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCESS
} from "../constant/authConstant";

export const userAuthReducer = (state = {}, action) => {
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
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNUP_FAILED:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

// export const signUpReducers = (state = {}, action) => {
//   switch (action.type) {
//     case USER_SIGNUP_REQUEST:
//       return { loading: true };
//     case USER_SIGNUP_SUCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_SIGNIN_FAILED:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
