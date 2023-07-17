import {
  EDIT_STORE,
  REMOVE_FROM_CART,
  SET_SHOP_ITEMS,
  LOGIN,
  LOGOUT,
  ADD_QUANTITY,
  REDUCE_QUANTITY,
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

    case ADD_QUANTITY: {
      const existingItemIndex = state.cart.items?.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let updatedCart;
      let updatedCartItems = [...state.cart?.items];
      // let updatedPrice = state.cart?.total;
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
      // updatedPrice += action.payload.item?.price;
      updatedCart = { items: updatedCartItems};
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case REDUCE_QUANTITY: {
      const existingItemIndex = state.cart?.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedCartItems = [...state.cart?.items];
      // let updatedPrice = state.cart?.total;

      updatedCartItems[existingItemIndex].quantity -= 1;

      // updatedPrice -= action.payload.item?.price;

      return {
        ...state,
        cart: { items: updatedCartItems
            // , total: updatedPrice 
        },
      };
    }

    case REMOVE_FROM_CART: {
      let updatedCartItems = state.cart.items.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      return { ...state, cart: { ...state.cart, items: updatedCartItems } };
    }

    default:
      break;
  }
};

export default reducer;
