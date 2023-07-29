import {
  EDIT_STORE,
  REMOVE_FROM_CART,
  SET_SHOP_ITEMS,
  LOGIN,
  LOGOUT,
  ADD_CART_ITEMS,
  ADD_TO_CART,
  ADD_QUANTITY,
  REDUCE_QUANTITY,
  SET_SEARCHED_VALUE,
  SET_STORES,
  SET_LOCATION_FILTER,
} from "./action-types";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        auth: {
          ...state?.auth,
          isLoggedIn: true,
          token: action.payload.token,
          username: action.payload.username,
        },
      };
    }
    case LOGOUT: {
      return {
        ...state,
        auth: {
          ...state?.auth,
          isLoggedIn: false,
          token: null,
          expiryDate: null,
          username: null,
        },
      };
    }

    case SET_STORES: {
      return { ...state, stores: action.payload.stores };
    }

    case EDIT_STORE: {
      return {
        ...state,
        editStoreKey: action.payload.id,
        editStore: action.payload.store,
      };
    }
    case SET_SHOP_ITEMS: {
      return { ...state, shopItems: action.payload };
    }

    case ADD_CART_ITEMS: {
      console.log({ payload: action.payload });
      return { ...state, cart: action.payload };
    }
    case ADD_TO_CART: {
      return { ...state, cart: state.cart.concat(action.payload)  };
    }
    case ADD_QUANTITY: {
      const updatedCart = state.cart?.map((cartItem) => {
        if (cartItem.product._id === action.payload)
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        else return cartItem;
      });

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case REDUCE_QUANTITY: {
      const updatedCart = state.cart?.map((cartItem) => {
        if (cartItem.product._id === action.payload)
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        else return cartItem;
      });
      // updatedPrice -= action.payload.item?.price;

      return {
        ...state,
        cart: updatedCart,
      };
    }
    case REMOVE_FROM_CART: {
      let updatedCartItems = state.cart.filter(
        (cartItem) => cartItem.product?._id !== action.payload
      );
      return { ...state, cart: updatedCartItems };
    }
    case SET_SEARCHED_VALUE: {
      return { ...state, searchedStore: action.payload.value };
    }
    case SET_LOCATION_FILTER: {
      return { ...state, location: { ...action.payload } };
    }

    default:
      break;
  }
};

export default reducer;
