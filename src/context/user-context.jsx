import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
import { getAuthDetails } from "../lib/localStorage";

let initialState = {
  auth: {
    isLoggedIn: false,
    token: null,
    expiryDate: null,
    username: null,
  },
  editStore: null,
  editStoreKey: null,
  orderItems: [],
  selectedItems: {},
  totalPrice: 0,
  shopItems: [],
};

export const UserContext = createContext(initialState);

const UserContextProvider = (props) => {
  let localStoreAuth = getAuthDetails();
  if (localStoreAuth?.token) {
    initialState = { ...initialState, auth: { ...localStoreAuth, isLoggedIn:true } };
  }
  const [globalState, dispatch] = useReducer(reducer, initialState);
  console.log({ globalState });
  return (
    <UserContext.Provider
      value={{ globalState: globalState, dispatch: dispatch }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
