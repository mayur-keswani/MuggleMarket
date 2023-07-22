import {
  ADD_CART_ITEMS,
  ADD_QUANTITY,
  ADD_TO_CART,
  LOGIN,
  LOGOUT,
  REDUCE_QUANTITY,
  REMOVE_FROM_CART,
  SET_LOCATION_FILTER,
  SET_SEARCHED_VALUE,
  SET_STORES,
} from "./action-types";

export const onLogin = ({ token, username }) => {
  return { type: LOGIN, payload: { token, username } };
};

export const onLogout = () => {
  return { type: LOGOUT };
};

export const addInitialCartItems = (data) => {
  return {
    type: ADD_CART_ITEMS,
    payload: data,
  };
};
export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    payload: id,
  };
};
export const removeQuantity = (id) => {
  return {
    type: REDUCE_QUANTITY,
    payload: id,
  };
};
export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id ,
  }
};

export const setSearchedValue = (value) => {
  return {
    type: SET_SEARCHED_VALUE,
    payload: { value },
  };
};
export const setUserLocationValue = (value) => {
  return {
    type: SET_LOCATION_FILTER,
    payload: { ...value },
  };
};
export const setStores = (stores) => {
  return {
    type: SET_STORES,
    payload: { stores },
  };
};

