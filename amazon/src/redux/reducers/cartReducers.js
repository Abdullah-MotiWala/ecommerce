import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SHIPPING_ADDRESS_SAVE
} from "../constant/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    //add item to cart
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      //checking if item already add so update
      if (existItem && item.qty !== 0) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          )
        };
      }
      //if item not avaiable ten add in cart items
      else if (item.qty !== 0) {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
      break;
    //remove item from cart
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload)
      };
    case SHIPPING_ADDRESS_SAVE:
      return {
        ...state,
        shippingAddress: action.payload
      };
    default:
      return state;
  }
};
