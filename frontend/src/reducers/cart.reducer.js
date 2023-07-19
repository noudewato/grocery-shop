import {
  CART_ADD_ITEM,
  CART_DECREMENT_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CLEAR_CART,
} from '../constants/cart.constant';

export const cartReducer = (state = { cartItems: [], deliverAddress: {}, paymentMethod:{} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.cartItems.find((item) => item._id === action.payload._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        deliverAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload._id),
      };

    case CLEAR_CART:
      return {
        cartItems: [],
        deliverAddress: {},
      };

    case CART_DECREMENT_ITEM: 
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? { ...item, qty: item.qty - 1 } : item
          ),
        };

    default:
      return state;
  }
};

