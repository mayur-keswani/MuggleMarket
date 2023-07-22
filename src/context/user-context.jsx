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
  cart: { items: [] }, //[{id:_id,quantity:2}],
  stores:[],
  searchedStore:'',
  location:{lat:null,long:null,city:null},
  editStore: null,
  editStoreKey: null,
};

export const UserContext = createContext(initialState);

const UserContextProvider = (props) => {
  let localStoreAuth = getAuthDetails();
  if (localStoreAuth?.token) {
    initialState = {
      ...initialState,
      auth: { ...localStoreAuth, isLoggedIn: true },
    };
  }
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider
      value={{ globalState: globalState, dispatch: dispatch }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
