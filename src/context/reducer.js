import {
  EDIT_STORE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_SHOP_ITEMS,
  LOGIN,
  LOGOUT,
} from "./action-types";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log(state);
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
    // case SET_LOADING: {
    //   return { ...state, isLoading: action.payload };
    // }
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

    case ADD_TO_CART: {
      const existingItemIndex = state.cart.items?.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let updatedCart;
      let updatedCartItems = [...state.cart?.items];
      let updatedPrice = state.cart?.total;
      if (existingItemIndex >= 0) {
        updatedCartItems[existingItemIndex].quantity =
          updatedCartItems[existingItemIndex].quantity + 1;
      } else {
        updatedCartItems = updatedCartItems.concat({
          id: action.payload.id,
          quantity: 1,
          item: action.payload.item,
        });
      }
      updatedPrice += action.payload.item?.price;
      updatedCart = { items: updatedCartItems, total: updatedPrice }
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case REMOVE_FROM_CART: {
      const existingItemIndex = state.cart?.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedCartItems = [...state.cart?.items];
      let updatedPrice = state.cart?.total;

      updatedCartItems[existingItemIndex].quantity -= 1;

      updatedPrice -= action.payload.item?.price;

      return {
        ...state,
        cart: { items: updatedCartItems, total: updatedPrice },
      };
    }
    default:
      break;
  }
};

export default reducer;
